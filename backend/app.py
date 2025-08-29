from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth, firestore
import os
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Permitir CORS para o frontend

# Configurar Firebase Admin SDK
cred = credentials.Certificate("../app-controle-de-carga-d7aab-firebase-adminsdk-fbsvc-5ce0f69631.json")
firebase_admin.initialize_app(cred)

# Inicializar Firestore
db = firestore.client()

@app.route('/')
def home():
    return jsonify({
        "message": "ACWR • sRPE Dashboard Backend",
        "status": "running",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/auth/verify', methods=['POST'])
def verify_token():
    """Verificar token do Firebase Auth"""
    try:
        data = request.get_json()
        id_token = data.get('idToken')
        
        if not id_token:
            return jsonify({"error": "Token não fornecido"}), 400
        
        # Verificar token com Firebase Admin
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        
        return jsonify({
            "success": True,
            "uid": uid,
            "email": decoded_token.get('email'),
            "name": decoded_token.get('name')
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@app.route('/api/sessions/<user_id>', methods=['GET'])
def get_sessions(user_id):
    """Buscar sessões do usuário"""
    try:
        # Verificar token de autorização
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"error": "Token de autorização necessário"}), 401
        
        id_token = auth_header.split('Bearer ')[1]
        decoded_token = auth.verify_id_token(id_token)
        
        if decoded_token['uid'] != user_id:
            return jsonify({"error": "Acesso negado"}), 403
        
        # Buscar sessões do Firestore
        sessions_ref = db.collection('users').document(user_id).collection('sessions')
        sessions = []
        
        for doc in sessions_ref.stream():
            session_data = doc.to_dict()
            session_data['id'] = doc.id
            sessions.append(session_data)
        
        return jsonify({
            "success": True,
            "sessions": sessions,
            "count": len(sessions)
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/sessions/<user_id>', methods=['POST'])
def save_sessions(user_id):
    """Salvar sessões do usuário"""
    try:
        # Verificar token de autorização
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"error": "Token de autorização necessário"}), 401
        
        id_token = auth_header.split('Bearer ')[1]
        decoded_token = auth.verify_id_token(id_token)
        
        if decoded_token['uid'] != user_id:
            return jsonify({"error": "Acesso negado"}), 403
        
        data = request.get_json()
        sessions = data.get('sessions', [])
        
        # Limpar sessões existentes
        sessions_ref = db.collection('users').document(user_id).collection('sessions')
        existing_docs = sessions_ref.stream()
        for doc in existing_docs:
            doc.reference.delete()
        
        # Salvar novas sessões
        batch = db.batch()
        for session in sessions:
            session_id = session.get('id')
            if session_id:
                doc_ref = sessions_ref.document(session_id)
                session_data = {k: v for k, v in session.items() if k != 'id'}
                batch.set(doc_ref, session_data)
        
        batch.commit()
        
        return jsonify({
            "success": True,
            "message": f"{len(sessions)} sessões salvas",
            "count": len(sessions)
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/sessions/<user_id>/<session_id>', methods=['DELETE'])
def delete_session(user_id, session_id):
    """Deletar uma sessão específica"""
    try:
        # Verificar token de autorização
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"error": "Token de autorização necessário"}), 401
        
        id_token = auth_header.split('Bearer ')[1]
        decoded_token = auth.verify_id_token(id_token)
        
        if decoded_token['uid'] != user_id:
            return jsonify({"error": "Acesso negado"}), 403
        
        # Deletar sessão
        doc_ref = db.collection('users').document(user_id).collection('sessions').document(session_id)
        doc_ref.delete()
        
        return jsonify({
            "success": True,
            "message": "Sessão deletada com sucesso"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Verificar saúde do servidor"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "firebase": "connected"
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
