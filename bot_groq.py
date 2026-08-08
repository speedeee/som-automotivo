from groq import Groq

API_KEY = "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"
client = Groq(api_key=API_KEY)

print("--- IA Groq Ativa no Termux (digite 'sair' para encerrar) ---")

historico = [
    {"role": "system", "content": "Você é um assistente virtual prestativo e amigável. Responda sempre em português do Brasil."}
]

while True:
    usuario = input("\nVocê: ")
    if usuario.lower() == 'sair':
        print("\nSessão encerrada!")
        break

    historico.append({"role": "user", "content": usuario})

    try:
        resposta = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=historico
        )
        texto_ia = resposta.choices[0].message.content
        print(f"\nIA: {texto_ia}")
        historico.append({"role": "assistant", "content": texto_ia})
    except Exception as e:
        print(f"\nErro de conexão: {e}")
