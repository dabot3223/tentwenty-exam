// /api/timesheet/getWeeklydata/route.js
import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const ts_uid = body.uid;
    let startDate = body.start || null;
    let endDate = body.end || null;
    const statusFilter = body.status; // 0=incomplete,1=complete,2=missing,null=all

    if (!ts_uid) {
      return NextResponse.json({ success: false, error: 'uid is required' }, { status: 400 });
    }

    // If no start/end, get them from tasks table
    if (!startDate || !endDate) {
      const [range] = await db.query(
        `SELECT MIN(date) AS min_date, MAX(date) AS max_date FROM tasks WHERE ts_uid = ?`,
        [ts_uid]
      );
      if (range[0].min_date && range[0].max_date) {
        startDate = range[0].min_date;
        endDate = range[0].max_date;
      } else {
        return NextResponse.json({ success: true, data: [] }); // no tasks at all
      }
    }

    const params = [startDate, endDate, ts_uid];

    // Query with recursive weeks generation
    let query = `
      WITH RECURSIVE weeks AS (
        SELECT STR_TO_DATE(?, '%Y-%m-%d') AS week_start
        UNION ALL
        SELECT DATE_ADD(week_start, INTERVAL 7 DAY)
        FROM weeks
        WHERE week_start < STR_TO_DATE(?, '%Y-%m-%d')
      )
      SELECT
        YEAR(w.week_start) AS year,
        WEEK(w.week_start, 1) AS week,
        w.week_start,
        DATE_ADD(w.week_start, INTERVAL 4 DAY) AS week_end,
        CASE
          WHEN COALESCE(SUM(SUBSTRING_INDEX(ts.time, ':', 1) + SUBSTRING_INDEX(ts.time, ':', -1)/60), 0) >= 40 THEN '1'
          WHEN COALESCE(SUM(SUBSTRING_INDEX(ts.time, ':', 1) + SUBSTRING_INDEX(ts.time, ':', -1)/60), 0) > 0 THEN '0'
          ELSE '2'
        END AS status,
        COALESCE(SUM(SUBSTRING_INDEX(ts.time, ':', 1) + SUBSTRING_INDEX(ts.time, ':', -1)/60), 0) AS total_hours
      FROM weeks w
      LEFT JOIN tasks ts 
        ON ts.ts_uid = ?
       AND ts.date BETWEEN w.week_start AND DATE_ADD(w.week_start, INTERVAL 4 DAY)
      GROUP BY w.week_start
    `;

    // Add HAVING if status filter provided
    if (statusFilter !== null && statusFilter !== undefined) {
      const statusMap = { 0: '0', 1: '1', 2: '2' };
      query += ` HAVING status = ?`;
      params.push(statusMap[statusFilter]);
    }

    query += ` ORDER BY year, week`;

    const [rows] = await db.query(query, params);

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
