CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    notification_count INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS file (
    id INT NOT NULL,
    name VARCHAR(45) NOT NULL,
    path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    type VARCHAR(45) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    KEY FK_1 (user_id),
    CONSTRAINT FK_3_1 FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE IF NOT EXISTS notification (
    id INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    action VARCHAR(45) NOT NULL,
    user_name VARCHAR(45) NOT NULL,
    file_name VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);
