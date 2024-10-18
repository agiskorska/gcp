from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/save', methods=['POST'])
def add_change():
    # Extract data from the request
    content = request.json
    print(content)
    ref = content['ref']
    if not ref:
        return jsonify({"error": "Missing required fields"}), 400
    else: 
        print(content)
    return jsonify({"message": "Change entity added successfully!"}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)