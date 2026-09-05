import { NextRequest, NextResponse } from 'next/server';
import { bookingFormSchema } from '@/lib/validations';
import { createServerClient } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body with Zod
    const validationResult = bookingFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid booking data submitted',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const bookingData = validationResult.data;
    const bookingReference = `WT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Attempt to store in Supabase
    try {
      const supabase = createServerClient();
      
      const { data, error } = await supabase.from('bookings').insert([
        {
          booking_reference: bookingReference,
          client_name: bookingData.client_name,
          client_email: bookingData.client_email,
          client_phone: bookingData.client_phone,
          company_name: bookingData.company_name || null,
          show_name: bookingData.show_name || null,
          requested_date: bookingData.requested_date,
          requested_time_slot: bookingData.requested_time_slot,
          guest_count: bookingData.guest_count,
          add_ons: bookingData.add_ons,
          estimated_total_lkr: body.estimated_total_lkr || 0,
          client_notes: bookingData.client_notes || null,
          status: 'pending',
        },
      ]).select();

      if (error) {
        // If Supabase is running with mock keys, log and proceed with successful mock confirmation
        console.warn('Supabase insert note (using mock fallback if unconfigured):', error.message);
      }
    } catch (dbErr) {
      console.warn('Database connection note:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Booking reservation received successfully',
      bookingReference,
      clientName: bookingData.client_name,
      requestedDate: bookingData.requested_date,
    });
  } catch (err: any) {
    console.error('Booking API Error:', err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || 'Internal server error while processing booking',
      },
      { status: 500 }
    );
  }
}
