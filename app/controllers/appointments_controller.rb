class AppointmentsController < ApplicationController
  def show
  end

  def create
    appointment = Appointment.new params[:appointment]

    unless appointment.save
      error = appointment.errors.messages.first
      flash.alert = "#{error[0]} #{error[1][0]}"
      redirect_to action: 'show'
    end
  end
end
