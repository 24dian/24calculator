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

    // 使用setTimeout给UI一个刷新机会
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
    const solutions = new Set(); // 使用Set来存储结果，自动去重
    const operators = ['+', '-', '*', '/'];
    const epsilon = 1e-6; // 用于浮点数比较

    function solve(arr, exprArr) {
        if (arr.length === 1) {
            if (Math.abs(arr[0] - 24) < epsilon) {
                solutions.add(exprArr[0]);
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

                // 剩余的数字和表达式
                const remainingNums = arr.filter((_, index) => index !== i && index !== j);
                const remainingExprs = exprArr.filter((_, index) => index !== i && index !== j);

                for (const op of operators) {
                    if (op === '/' && Math.abs(b) < epsilon) continue; // 避免除以0

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
                            newExpr = `${exprA} * ${exprB}`; // 乘法可以去掉一些括号
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
