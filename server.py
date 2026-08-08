import os
from flask import Flask, request
from groq import Groq

app = Flask(__name__)
client = Groq(api_key="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")

historico = [
    {"role": "system", "content": "Você é um assistente de voz direto. Responda em texto limpo sem emojis ou asteriscos."}
]

@app.route('/chat', methods=['GET'])
def chat():
    mensagem = request.args.get('msg', '')
    if not mensagem:
        return "Nenhuma mensagem recebida."

    msg_lower = mensagem.lower()

    if "alarme" in msg_lower:
        os.system('am start -a android.intent.action.SET_ALARM --ei android.intent.extra.alarm.HOUR 7 --ei android.intent.extra.alarm.MINUTE 0 --ez android.intent.extra.alarm.SKIP_UI true')

    elif "ymusic" in msg_lower or "música" in msg_lower:
        os.system("am start -n com.koushikdutta.vysor")

    elif "volume máximo" in msg_lower:
        os.system("media volume --stream 3 --set 15")

    historico.append({"role": "user", "content": mensagem})

    if len(historico) > 11:
        historico.pop(1)

    try:
        resposta = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=historico
        )
        conteudo = resposta.choices[0].message.content
        historico.append({"role": "assistant", "content": conteudo})
        return conteudo
    except Exception as e:
        return f"Erro: {str(e)}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
