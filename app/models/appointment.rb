class Appointment < ActiveRecord::Base
  attr_accessible :fio, :phone, :email, :service_id, :master_id
  belongs_to :service
  belongs_to :master

  validates :service, :fio, :phone, presence: true

  after_create do
    #AppointmentMailer.appointment_email(self).deliver
  end
end
