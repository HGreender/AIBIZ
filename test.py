import openai

def check_openai_api_key(api_key):
    client = openai.OpenAI(api_key=api_key, base_url='https://api.vsegpt.ru/v1')
    try:
        client.models.list()
    except openai.AuthenticationError:
        return False
    else:
        return True


OPENAI_API_KEY = "sk-or-vv-a95abbde220b7af0ff1babe6b261eb205ddb75edef9e7e0919c55cf1ec0574c4"

if check_openai_api_key(OPENAI_API_KEY):
    print("Valid OpenAI API key.")
else:
    print("Invalid OpenAI API key.")