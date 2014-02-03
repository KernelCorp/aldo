class AppointmentsController < ApplicationController
  def show
    @appointment = Appointment.new
  end

  def create
    @appointment = Appointment.new params[:appointment]

    unless @appointment.save
      render 'show'
    end
  end
end
