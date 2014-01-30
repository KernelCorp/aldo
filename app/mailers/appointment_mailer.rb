class AppointmentMailer < ActionMailer::Base
  default from: "from@example.com"

  def appointment_email( appointment )
    @appointment = appointment

    mail(to: @user.email, subject: "Заявка на #{appointment.service.name}")
  end
end
