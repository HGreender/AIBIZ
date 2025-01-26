from openai import OpenAI

# with open('A:/key.txt', 'r') as file:
#     key = file.read()
key = 'sk-abcdef1234567890abcdef1234567890abcdef12'
url = 'https://api.vsegpt.ru/v1'

client = OpenAI(
    # Ваш ключ в VseGPT после регистрации
    api_key=key,
    # base_url=url,
)
req = input('Введите вашу цель: ')
prompt = "Каким частям SMART не соответствует следующая цель: " \
         + req + ". Напиши буквы, которым не соответствует задача и объясни, почему не соответствует"

messages = list()
# messages.append({"role": "system", "content": system_text})
messages.append({"role": "user", "content": prompt})

response_big = client.chat.completions.create(
    model="openai/gpt-4",   # ID модели из списка моделей - можно использовать OpenAI, Anthropic и пр. меняя только этот параметр
    messages=messages,
    temperature=0.7,
    n=1,
    max_tokens=3000,    # Максимальное число ВЫХОДНЫХ токенов. Для большинства моделей не должно превышать 4096
    extra_headers={"X-Title": "My App"},    # Опционально - передача информация об источнике API-вызова
)

# print("Response BIG:",response_big)
response = response_big.choices[0].message.content
print("Response 1:", response)

prompt = "Коротко сформируй 5 вариантов по следующей цели по методике SMART: " \
         + req + "Указывать значения букв методики и сами буквы не надо."

messages = list()
# messages.append({"role": "system", "content": system_text})
messages.append({"role": "user", "content": prompt})

response_big = client.chat.completions.create(
    model="openai/gpt-4",   # ID модели из списка моделей - можно использовать OpenAI, Anthropic и пр. меняя только этот параметр
    messages=messages,
    temperature=0.7,
    n=1,
    max_tokens=3000,    # Максимальное число ВЫХОДНЫХ токенов. Для большинства моделей не должно превышать 4096
    extra_headers={"X-Title": "My App"},    # Опционально - передача информация об источнике API-вызова
)

# print("Response BIG:",response_big)
response = response_big.choices[0].message.content
print("Response 2:", response)
