
function start() {
    const expression = prompt(
        "계산식을 입력하세요.\n예: 10 + 2 * 5"
    );

    // 취소 버튼을 누르거나 입력하지 않은 경우
    if (expression === null || expression.trim() === "") {
        console.log("계산이 취소되었습니다.");
        return;
    }

    const formula = expression.replace(/\s/g, "");

    // 숫자, 소수점, 사칙연산 기호, 괄호만 허용
    if (!/^[0-9+\-*/().]+$/.test(formula)) {
        console.log("잘못된 계산식입니다.");
        return;
    }

    // 숫자와 연산자가 올바르게 작성되었는지 확인
    const numberPattern =
        /(?:\d+(?:\.\d*)?|\.\d+)|[()+\-*/]/g;

    const tokens = formula.match(numberPattern);

    if (!tokens || tokens.join("") !== formula) {
        console.log("잘못된 계산식입니다.");
        return;
    }

    // JavaScript의 연산자 우선순위를 적용하여 계산
    try {
        const result = Function(
            '"use strict"; return (' + formula + ');'
        )();

        if (typeof result !== "number" ||
            !Number.isFinite(result)) {
            console.log("계산할 수 없는 식입니다.");
            return;
        }

        console.log("계산식:", expression);
        console.log("결과:", result);

        alert("결과: " + result);
    } catch (error) {
        console.log("잘못된 계산식입니다.");
    }
}
