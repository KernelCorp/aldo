class AppointmentMailer < ActionMailer::Base
  default from: "aldo.from.site@gmail.com"

  def appointment_email( appointment )
    @appointment = appointment

    mail(to: 'info@aldo-coppola.ru', subject: "Заявка на #{appointment.service.name}")
  end
end
