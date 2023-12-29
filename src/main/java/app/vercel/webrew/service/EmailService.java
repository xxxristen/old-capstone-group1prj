package app.vercel.webrew.service;

import app.vercel.webrew.model.EmailDetails;

public interface EmailService {
    String sendSimpleMail(EmailDetails details);

}
