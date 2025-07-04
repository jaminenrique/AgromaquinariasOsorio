package com.agromaquinariasosorio.utils;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Properties;

public class CorreoUtils {

    public static void sentEmail(String destinatario, String asunto, String mensajeTexto) {
        final String remitente = "jaminfloresv@gmail.com";
        final String remitenteclave = "gnevpfnhfxyiaqxq";
        HashMap<String, String> properties = new HashMap<>();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");

        Properties props = new Properties();
        props.putAll(properties); // Aquí se pasa todo del HashMap a Properties
        Session session = Session.getInstance(props, new jakarta.mail.Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(remitente, remitenteclave);
            }
        });
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(remitente));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(destinatario));
            message.setSubject(asunto);
            message.setText(mensajeTexto);

            Transport.send(message);
            System.out.println("Correo enviado correctamente");

        } catch (MessagingException e) {
            e.printStackTrace();
            System.out.println("Error al enviar correo: " + e.getMessage());
        }
    }
}
