class Appointment < ActiveRecord::Base
  attr_accessible :email, :fio, :phone
  belongs_to :service
  belongs_to :master

  after_create do
    AppointmentMailer.appointment_email(self).deliver
  end
end
