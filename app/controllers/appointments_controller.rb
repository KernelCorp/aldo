class AppointmentsController < ApplicationController
  def show
  end

  def create
    Appointment.create! params[:appointment]
  rescue
    redirect_to action: 'show'
  end
end
