import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { nombre, email, mensaje } = await req.json();

  if (!nombre || !email || !mensaje) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    return NextResponse.json({ error: "Servidor no configurado" }, { status: 500 });
  }

  const { error } = await resend.emails.send({
    from: "Contacto hugomitoire.com.ar <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `Nuevo mensaje de ${nombre}`,
    text: `Nombre: ${nombre}\nEmail: ${email}\n\n${mensaje}`,
  });

  if (error) {
    return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
