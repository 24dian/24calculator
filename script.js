body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background-color: #f0f2f5;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px 0;
}

.container {
    background-color: #fff;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 420px;
    width: 95%;
}

h1 {
    color: #1a73e8;
    margin-bottom: 10px;
}

.description {
    color: #666;
    margin-bottom: 20px;
}

/* 数字显示区域 */
.display-area {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 25px;
}

.number-slot {
    width: 60px;
    height: 60px;
    border: 2px solid #ddd;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: bold;
    color: #333;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}

.number-slot.active {
    border-color: #1a73e8;
    box-shadow: 0 0 8px rgba(26, 115, 232, 0.4);
}

/* 按钮键盘 */
.keypad {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-bottom: 25px;
}

.key {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 8px;
    height: 50px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
}

.key:hover {
    background-color: #e9ecef;
}

.key.key-control {
    background-color: #ffc107;
    color: white;
    font-size: 22px;
}

.key.key-control:hover {
    background-color: #e0a800;
}

#calculate-btn {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;
}

#calculate-btn:hover {
    background-color: #218838;
}

/* 结果区域 */
#result-area {
    margin-top: 25px;
    text-align: left;
}

#results {
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 15px;
    min-height: 80px;
    max-height: 150px;
    overflow-y: auto;
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    line-height: 1.6;
}
#results p { margin: 0; color: #555; }
#results .solution { color: #17a2b8; font-weight: bold; }

