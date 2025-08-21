document.getElementById('calculate-btn').addEventListener('click', () => {
    const inputs = [
        document.getElementById('num1').value,
        document.getElementById('num2').value,
        document.getElementById('num3').value,
        document.getElementById('num4').value
    ];

    const numbers = inputs.map(val => parseInt(val, 10));

    if (numbers.some(isNaN) || numbers.some(n => n < 1 || n > 13)) {
        alert('请输入4个1到13之间的有效整数！');
        return;
    }

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<p>正在计算中...</p>';

    setTimeout(() => {
        const solutions = find24(numbers);
        if (solutions.size > 0) {
            let html = '';
            solutions.forEach(sol => {
                html += `<p class="solution">${sol.replace(/(\d+)/g, '<strong>\$1</strong>')}</p>`;
            });
            resultsContainer.innerHTML = html;
        } else {
            resultsContainer.innerHTML = '<p>这组数字无法计算出24点。</p>';
        }
    }, 10);
});

function find24(nums) {
    const solutions = new Set();
    const operators = ['+', '-', '*', '/'];
    const epsilon = 1e-6; 

    function solve(arr, exprArr) {
        if (arr.length === 1) {
            if (Math.abs(arr[0] - 24) < epsilon) {
                // 移除表达式最外层的括号，使其更美观
                let finalExpr = exprArr[0];
                if (finalExpr.startsWith('(') && finalExpr.endsWith(')')) {
                    finalExpr = finalExpr.substring(1, finalExpr.length - 1);
                }
                solutions.add(finalExpr);
            }
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (i === j) continue;

                const a = arr[i];
                const b = arr[j];
                const exprA = exprArr[i];
                const exprB = exprArr[j];

                const remainingNums = arr.filter((_, index) => index !== i && index !== j);
                const remainingExprs = exprArr.filter((_, index) => index !== i && index !== j);

                for (const op of operators) {
                    // --- 核心优化点在这里 ---
                    // ADDED: 对于加法和乘法，如果 a > b，则跳过。
                    // 这可以防止产生如 3+2 和 2+3 这样的重复解。
                    if ((op === '+' || op === '*') && a > b) {
                        continue;
                    }
                    if (op === '-' && a < b) { // 可选优化：a-b = -(b-a)，在某些情况下可减少冗余
                        continue;
                    }

                    if (op === '/' && (Math.abs(b) < epsilon || a / b === 1)) {
                        // 避免除以0，同时避免 a/a=1 这种无效操作
                        continue;
                    }
                    // --- 优化结束 ---

                    let newNum, newExpr;
                    switch (op) {
                        case '+':
                            newNum = a + b;
                            newExpr = `(${exprA} + ${exprB})`;
                            break;
                        case '-':
                            newNum = a - b;
                            newExpr = `(${exprA} - ${exprB})`;
                            break;
                        case '*':
                            newNum = a * b;
                            newExpr = `(${exprA} * ${exprB})`;
                            break;
                        case '/':
                            newNum = a / b;
                            newExpr = `(${exprA} / ${exprB})`;
                            break;
                    }
                    
                    solve([...remainingNums, newNum], [...remainingExprs, newExpr]);
                }
            }
        }
    }

    solve(nums, nums.map(String));
    return solutions;
}
