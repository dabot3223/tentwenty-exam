// /api/timesheet/getTasksData
import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { uid, start, end } = body;
    console.log(uid, start, end)

    if (!uid) {
      return NextResponse.json(
        { success: false, error: 'uid is required' },
        { status: 400 }
      );
    }

    if (!start || !end) {
      return NextResponse.json(
        { success: false, error: 'start and end dates are required' },
        { status: 400 }
      );
    }

    const query = `
      SELECT 
        ts.ts_id,
        ts.ts_name,
        ts.ts_pid,
        ts.ts_uid,
        ts.time,
        ts.date,
        pj.p_name
      FROM tasks ts LEFT JOIN projects as pj ON pj.p_id = ts.ts_pid
      WHERE ts.ts_uid = ?
        AND ts.date BETWEEN ? AND ?
      ORDER BY ts.date ASC
    `;

    const [rows] = await db.query(query, [uid, start, end]);

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error('Error fetching tasks by range:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
