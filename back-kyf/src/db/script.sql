-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    fandometro_score INT DEFAULT 0,
    foto_url VARCHAR(255)
);

-- Criação da tabela de interesses
-- Utilizando JSON para armazenar os vetores de frases
CREATE TABLE IF NOT EXISTS interesses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    jogos JSON DEFAULT NULL,
    eventos JSON DEFAULT NULL,
    compras JSON DEFAULT NULL,
    FOREIGN KEY (cpf) REFERENCES usuarios(cpf) ON DELETE CASCADE
);