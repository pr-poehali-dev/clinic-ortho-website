import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки на запись на приём на почту клиники admin@vash-ortoped54.ru"""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors_headers, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    comment = body.get("comment", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}, ensure_ascii=False),
        }

    smtp_host = os.environ.get("SMTP_HOST", "")
    smtp_port = int(os.environ.get("SMTP_PORT", "465"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    to_email = "admin@vash-ortoped54.ru"

    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #1a2940; background: #f8f6f2; padding: 20px;">
      <div style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 32px; border: 1px solid #e5e0d8;">
        <h2 style="color: #2d7d8e; margin-top: 0;">📋 Новая заявка на приём</h2>
        <p style="margin: 0 0 8px;"><b>Клиника:</b> Ваш Ортопед, Новосибирск</p>
        <hr style="border: none; border-top: 1px solid #e5e0d8; margin: 16px 0;">
        <p style="margin: 0 0 8px;"><b>Имя:</b> {name}</p>
        <p style="margin: 0 0 8px;"><b>Телефон:</b> <a href="tel:{phone}" style="color: #2d7d8e;">{phone}</a></p>
        {"<p style='margin: 0 0 8px;'><b>Комментарий:</b> " + comment + "</p>" if comment else ""}
        <hr style="border: none; border-top: 1px solid #e5e0d8; margin: 16px 0;">
        <p style="font-size: 12px; color: #888; margin: 0;">Заявка отправлена с сайта vash-ortoped54.ru</p>
      </div>
    </body>
    </html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая запись на приём: {name}"
    msg["From"] = smtp_user
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"success": True, "message": "Заявка успешно отправлена"}, ensure_ascii=False),
    }