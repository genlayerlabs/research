(() => {
  const locale = document.documentElement.lang.split("-")[0];
  const isCompactPhone = () => window.matchMedia("(max-width: 560px)").matches;

  // Respect a visitor's explicit choice. On a first visit to the English root,
  // use the browser/phone language when a translated guide is available.
  const languageSelect = document.querySelector("[data-language-select]");
  if (languageSelect) {
    const storageKey = "genlayer-guide-language";
    const currentLanguage = languageSelect.dataset.currentLocale;
    const options = [...languageSelect.options];
    const supported = new Set(options.map((option) => option.dataset.locale));
    const readChoice = () => {
      try { return window.localStorage.getItem(storageKey); } catch { return null; }
    };
    const saveChoice = (choice) => {
      try { window.localStorage.setItem(storageKey, choice); } catch { /* Storage may be disabled. */ }
    };
    const navigateTo = (choice, replace = false) => {
      const option = options.find((item) => item.dataset.locale === choice);
      if (!option) return;
      const target = new URL(option.value, window.location.href);
      target.hash = window.location.hash;
      if (replace) window.location.replace(target.href);
      else window.location.assign(target.href);
    };

    languageSelect.addEventListener("change", () => {
      const choice = languageSelect.selectedOptions[0]?.dataset.locale;
      if (!choice) return;
      saveChoice(choice);
      navigateTo(choice);
    });

    if (currentLanguage === "en") {
      const stored = readChoice();
      const browserChoice = [...(navigator.languages || []), navigator.language]
        .filter(Boolean)
        .map((value) => value.toLowerCase().split("-")[0])
        .find((value) => supported.has(value));
      const preferred = supported.has(stored) ? stored : browserChoice;
      if (preferred && preferred !== currentLanguage) navigateTo(preferred, true);
    }
  }

  const localizedCopy = {
    en: {
      yes: "YES", no: "NO", stakesLevels: ["LOW", "MEDIUM", "HIGH"], strengthLevels: ["LOW", "MEDIUM", "HIGH"],
      panelResult: (size, label) => `Under this declared model, a random ${size}-person panel reaches the population-majority side ${label} of the time.`,
      selectedCase: (stakes, strength) => `Selected case: ${stakes.toLowerCase()} stakes and ${strength.toLowerCase()} current-answer strength. Drag the point or use arrow keys.`,
      stopCase: "LOW-STAKES CASE", stop: "STOP",
      stopExplanation: "The cost of being wrong does not justify buying another experiment in this illustration.",
      replaceCase: "SERIOUS CASE · WEAK CURRENT ANSWER", replace: "START WITH A NEW ANSWER",
      replaceExplanation: "The stakes justify another experiment, but the current answer is not worth keeping.",
      recheckCase: "SERIOUS CASE · PROMISING CURRENT ANSWER", recheck: "CHECK THIS ANSWER AGAIN",
      recheckExplanation: "The stakes justify more evidence, and the current answer is worth keeping.",
      anotherPanel: "ANOTHER PANEL", appeal: "APPEAL", noAppeal: "NO APPEAL",
      missedAppeal: "MISSED APPEAL", missedCopy: "The system values another panel, but no private actor wants to trigger it.",
      excessAppeal: "EXCESS APPEAL", excessCopy: "The actor wants to appeal even though the system would rather stop.",
      aligned: "ACTIONS ALIGNED", alignedContinue: "Both the system and the actor choose another panel.", alignedStop: "Both the system and the actor choose to stop.",
      advFlipped: "{pct}% FLIPPED",
      advBelow: "Worst case: adversaries flip {flipped}% of the population from YES to NO. A random {size}-person panel still reaches the honest-majority side {label} of the time.",
      advTie: "The adversarial share exactly erases the honest margin: the corrupted population is split 50/50, and the panel decision is a coin flip.",
      advAbove: "The adversarial share exceeds the honest margin: the corrupted population now leans NO, and larger panels make the overturned decision more stable, not less. The panel reaches the honest-majority side only {label} of the time.",
      clarityLevels: ["bitterly contested", "contested", "leaning one way", "clear-cut"],
      clarityReadout: "{pct}% agree \u00b7 {word}",
      stopTooRisky: "TOO RISKY", stopSweet: "SWEET SPOT", stopOverkill: "OVERKILL",
      stopRisk: "RISK", stopFees: "FEES", stopTotal: "TOTAL",
      stopXAxis: "PANEL SIZE OF THE ROUND YOU STOP AT",
      stopAction: "STOP AT THE {K}-EVALUATOR ROUND",
      stopCopy: "With {L} at stake on a {word} question, stop at {K} evaluators: {feesK} in fees plus {riskK} of risk left. The next round ({nextK}) would add {fees} to remove only {risk}. Not worth it.",
      stopCopyMax: "With {L} at stake on a {word} question, even the largest panel pays for itself: {feesK} in fees, {riskK} of risk left. There is no bigger round.",
      dialRhoLabel: "{rho} the bond",
      dialTitle: "A CHALLENGER'S BREAK-EVEN BELIEF",
      dialCeiling: "\u224850% CEILING: A RE-RUN 3\u20132 IS A COIN FLIP",
      dialReachable: "REACHABLE WITH HONEST RE-EXECUTION",
      dialPrivate: "NEEDS PRIVATE KNOWLEDGE",
      dialCosts: "COSTS EAT THIS",
      dialToday: "67% \u00b7 AT TODAY'S 1.5\u00d7",
      dialThreshold: "THRESHOLD {pct}",
      dialAxisTitle: "THE PAYOUT MULTIPLE",
      dialDead: "DEAD \u00b7 CEILING UNREACHABLE", dialWindow: "THE WINDOW", dialSpam: "SPAM PAYS",
      dialFloorTick: "2\u00d7 \u00b7 informed break-even",
      dialSpamTick: "\u22482.9\u00d7 \u00b7 blind appeals go +EV",
      dialDeadAction: "MECHANISM DEAD ON MARGINAL DECISIONS",
      dialDeadCopy: "At {rho}, the {pct} threshold sits beyond the \u224850% that honest re-execution of a 3\u20132 can ever justify. No informed challenger can rationally appeal; only private certainty acts, and a measured appeal rate near zero is geometry, not apathy.",
      dialWindowAction: "INSIDE THE WINDOW",
      dialWindowCopy: "At {rho}, the {pct} threshold sits inside the honestly-reachable band with {room} points of headroom for the challenger's real costs. Informed challenges on marginal decisions become rational; blind spam still loses money.",
      dialSpamAction: "SPAM BECOMES PROFITABLE",
      dialSpamCopy: "At {rho}, blind-appealing every marginal decision is profitable with zero work. Past \u22482.9\u00d7 the payout stops buying scrutiny and starts buying noise, which is why richer is not better.",
    },
    es: {
      yes: "SÍ", no: "NO", stakesLevels: ["BAJO", "MEDIO", "ALTO"], strengthLevels: ["BAJA", "MEDIA", "ALTA"],
      panelResult: (size, label) => label.startsWith("> ")
        ? `En este modelo de muestreo independiente, la decisión de un grupo aleatorio de ${size} evaluadores coincide con el lado mayoritario de la población en más del ${label.slice(2)} de los casos.`
        : `En este modelo de muestreo independiente, la decisión de un grupo aleatorio de ${size} evaluadores coincide con el lado mayoritario de la población en el ${label} de los casos.`,
      selectedCase: (stakes, strength) => `Ejemplo seleccionado: coste de error ${stakes.toLowerCase()}; solidez de la respuesta actual ${strength.toLowerCase()}. Arrastra el punto o usa las flechas.`,
      stopCase: "BAJO COSTE DE ERROR", stop: "DETENERSE",
      stopExplanation: "En este ejemplo, el coste de equivocarse no justifica pagar otra evaluación.",
      replaceCase: "DECISIÓN IMPORTANTE · RESPUESTA ACTUAL DÉBIL", replace: "GENERAR UNA RESPUESTA NUEVA",
      replaceExplanation: "El coste de equivocarse justifica seguir evaluando, pero conviene generar una respuesta nueva en lugar de volver a evaluar la actual.",
      recheckCase: "DECISIÓN IMPORTANTE · RESPUESTA ACTUAL SÓLIDA", recheck: "VOLVER A EVALUAR ESTA RESPUESTA",
      recheckExplanation: "El coste de equivocarse justifica reunir más información, y la respuesta actual merece otra evaluación.",
      anotherPanel: "SEGUIR EVALUANDO", appeal: "APELAR", noAppeal: "NO APELAR",
      missedAppeal: "APELAR SERÍA ÚTIL, PERO NADIE LO HACE", missedCopy: "En este caso, los intereses del sistema y de los participantes no coinciden.",
      excessAppeal: "APELACIÓN INNECESARIA", excessCopy: "Al participante le conviene apelar, aunque al sistema le convendría detenerse.",
      aligned: "AMBOS ELIGEN LO MISMO", alignedContinue: "Tanto al sistema como al participante les conviene seguir evaluando.", alignedStop: "Tanto al sistema como al participante les conviene detenerse.",
      advFlipped: "{pct}% INVERTIDO",
      advBelow: "Peor caso: los adversarios invierten el {flipped}% de la población de SÍ a NO. Un grupo aleatorio de {size} evaluadores aún alcanza el lado de la mayoría honesta con probabilidad {label}.",
      advTie: "La proporción de adversarios anula exactamente el margen honesto: el conjunto corrompido queda dividido al 50/50 y la decisión del grupo es como lanzar una moneda.",
      advAbove: "La proporción de adversarios supera el margen honesto: el conjunto corrompido ahora se inclina hacia el NO, y cuantos más evaluadores se añaden, más se asienta la decisión invertida. El grupo alcanza el lado de la mayoría honesta solo con probabilidad {label}.",
      clarityReadout: "{pct}% de acuerdo · {word}",
      stopTooRisky: "DEMASIADO RIESGO",
      stopSweet: "PUNTO ÓPTIMO",
      stopOverkill: "DERROCHE",
      stopRisk: "RIESGO",
      stopFees: "TARIFAS",
      stopTotal: "TOTAL",
      stopXAxis: "NÚMERO DE EVALUADORES DE LA RONDA EN LA QUE TE DETIENES",
      stopAction: "DETENERSE EN LA RONDA DE {K} EVALUADORES",
      stopCopy: "Con {L} en juego en una pregunta {word}, la ronda de {K} evaluadores cuesta {total} todo incluido. Escalar hasta {nextK} evaluadores añade {fees} en tarifas para eliminar solo {risk} de riesgo.",
      dialRhoLabel: "{rho} la fianza",
      dialTitle: "LA CREENCIA MÍNIMA PARA QUE APELAR COMPENSE",
      dialCeiling: "TECHO ≈50%: REEVALUAR UN 3–2 ES UNA MONEDA AL AIRE",
      dialReachable: "ALCANZABLE CON UNA REEVALUACIÓN HONESTA",
      dialPrivate: "REQUIERE INFORMACIÓN PRIVADA",
      dialCosts: "LOS COSTES SE LO COMEN",
      dialToday: "67% · CON EL 1,5× ACTUAL",
      dialThreshold: "UMBRAL {pct}",
      dialAxisTitle: "EL MULTIPLICADOR DEL PAGO",
      dialDead: "ZONA MUERTA · TECHO INALCANZABLE",
      dialWindow: "LA VENTANA",
      dialSpam: "EL SPAM COMPENSA",
      dialFloorTick: "2× · umbral informado",
      dialSpamTick: "≈2,9× · rentable apelar a ciegas",
      dialDeadAction: "MECANISMO MUERTO EN LAS DECISIONES AJUSTADAS",
      dialDeadCopy: "Con {rho}, el umbral del {pct} queda más allá del ≈50% que una reevaluación honesta de un 3–2 puede llegar a justificar. Ningún apelante informado puede apelar de forma racional; solo actúa quien tiene una certeza privada, así que una tasa de apelaciones cercana a cero refleja la geometría del propio diseño antes que la apatía de nadie.",
      dialWindowAction: "DENTRO DE LA VENTANA",
      dialWindowCopy: "Con {rho}, el umbral del {pct} queda dentro de la banda alcanzable con honestidad y deja {room} puntos de margen para los costes reales del apelante. Las apelaciones informadas sobre decisiones ajustadas pasan a ser racionales; el spam a ciegas sigue perdiendo dinero.",
      dialSpamAction: "EL SPAM SE VUELVE RENTABLE",
      dialSpamCopy: "Con {rho}, apelar a ciegas cada decisión ajustada es rentable sin trabajo alguno. Más allá de ≈2,9×, el pago empieza a comprar ruido en vez de escrutinio; de ahí que subir el multiplicador no mejore nada.",
      clarityLevels: ["muy disputada","disputada","con tendencia clara","prácticamente resuelta"],
    },
    ko: {
      yes: "예", no: "아니요", stakesLevels: ["낮음", "중간", "높음"], strengthLevels: ["낮음", "중간", "높음"],
      panelResult: (size, label) => label.startsWith("> ")
        ? `이 독립 표본 모델에서 무작위로 뽑은 ${size}명의 평가자 그룹이 전체 다수 결정을 재현할 확률은 ${label.slice(2)}보다 높습니다.`
        : `이 독립 표본 모델에서 무작위로 뽑은 ${size}명의 평가자 그룹이 전체 다수 결정을 재현할 확률은 ${label}입니다.`,
      selectedCase: (stakes, strength) => `선택한 예시: 오판 비용 ${stakes}, 현재 답변의 설득력 ${strength}. 점을 끌거나 방향키를 사용하세요.`,
      stopCase: "오판 비용 낮음", stop: "중단",
      stopExplanation: "이 예시에서는 오판 비용이 추가 평가 비용을 정당화하지 않습니다.",
      replaceCase: "중요한 결정 · 현재 답변이 약함", replace: "새 답변 만들기",
      replaceExplanation: "오판 비용이 커서 평가를 더 할 필요는 있지만, 현재 답변보다는 새 답변을 평가하는 편이 낫습니다.",
      recheckCase: "중요한 결정 · 현재 답변이 설득력 있음", recheck: "현재 답변 다시 평가하기",
      recheckExplanation: "근거가 더 필요하지만, 현재 답변은 다시 평가할 가치가 있습니다.",
      anotherPanel: "평가 계속하기", appeal: "이의 제기하기", noAppeal: "이의 제기하지 않기",
      missedAppeal: "필요한 이의 제기가 일어나지 않습니다", missedCopy: "이 값에서는 시스템에 추가 평가가 도움이 되지만, 참여자에게는 이의를 제기할 이유가 없습니다.",
      excessAppeal: "불필요한 이의 제기", excessCopy: "시스템은 중단하는 편이 낫지만, 참여자에게는 이의를 제기할 이유가 있습니다.",
      aligned: "양쪽의 선택이 같습니다", alignedContinue: "시스템과 참여자 모두 평가를 계속하는 편을 선택합니다.", alignedStop: "시스템과 참여자 모두 중단하는 편을 선택합니다.",
      advFlipped: "{pct}% 뒤집힘",
      advBelow: "최악의 경우: 적대적 참여자가 전체의 {flipped}%를 ‘예’에서 ‘아니요’로 뒤집습니다. 그래도 무작위로 뽑은 {size}명 그룹이 정직한 다수 쪽 결론에 도달할 확률은 {label}입니다.",
      advTie: "적대적 비율이 정직한 다수의 우위를 정확히 지워 버립니다. 오염된 집단은 50 대 50으로 갈리고, 그룹의 결정은 동전 던지기가 됩니다.",
      advAbove: "적대적 비율이 정직한 다수의 우위를 넘어섭니다. 오염된 집단은 이제 ‘아니요’ 쪽으로 기울고, 그룹이 클수록 뒤집힌 결정은 오히려 더 굳어집니다. 그룹이 정직한 다수 쪽에 도달할 확률은 {label}에 그칩니다.",
      clarityReadout: "{pct}% 동의 · {word}",
      stopTooRisky: "너무 위험",
      stopSweet: "최적 지점",
      stopOverkill: "과잉 투입",
      stopRisk: "위험",
      stopFees: "수수료",
      stopTotal: "총비용",
      stopXAxis: "중단하는 라운드의 평가자 수",
      stopAction: "평가자 {K}명 라운드에서 중단",
      stopCopy: "‘{word}’ 수준의 질문에 걸린 금액이 {L}인 상황에서, 평가자 {K}명 라운드의 총비용은 {total}입니다. {nextK}명으로 늘리면 수수료가 {fees} 더 들지만, 줄어드는 위험은 {risk}뿐입니다.",
      dialRhoLabel: "예치금의 {rho}",
      dialTitle: "이의 제기자의 손익분기 확신",
      dialCeiling: "≈50% 상한: 3–2를 다시 실행하면 동전 던지기",
      dialReachable: "정직한 재실행으로 도달 가능",
      dialPrivate: "비공개 정보 필요",
      dialCosts: "비용에 잠식됨",
      dialToday: "67% · 현재 1.5× 기준",
      dialThreshold: "임계값 {pct}",
      dialAxisTitle: "보상 배수",
      dialDead: "작동 불능 · 상한 도달 불가",
      dialWindow: "안전 구간",
      dialSpam: "스팸이 이득",
      dialFloorTick: "2× · 근거 있는 손익분기",
      dialSpamTick: "≈2.9× · 무작정 낸 이의 제기도 이득",
      dialDeadAction: "박빙 결정에서는 메커니즘 작동 불능",
      dialDeadCopy: "{rho}에서는 임계값 {pct}가, 3–2 결과를 정직하게 다시 실행해 얻을 수 있는 최대치인 약 50%를 넘어섭니다. 근거를 가진 이의 제기자는 누구도 합리적으로 나설 수 없고, 남모르는 확신을 가진 참여자만 움직입니다. 이의 제기 비율이 실제로 0에 가깝게 관측되는 것도 이 구조가 만든 결과입니다.",
      dialWindowAction: "안전 구간 안",
      dialWindowCopy: "{rho}에서는 임계값 {pct}가 정직한 재실행으로 도달할 수 있는 범위 안에 들어오고, 이의 제기자의 실제 비용을 감당할 여유가 {room} 포인트 남습니다. 박빙 결정에 대한 근거 있는 이의 제기는 합리적인 선택이 되고, 무작정 내는 스팸은 여전히 손해입니다.",
      dialSpamAction: "스팸이 이득이 됨",
      dialSpamCopy: "{rho}에서는 아무 근거 없이 모든 박빙 결정에 이의를 제기해도, 검증 작업을 전혀 하지 않고도 이익이 납니다. 약 2.9×를 넘어서면 보상이 사들이는 것은 꼼꼼한 검증이 아니라 소음입니다. 그래서 보상을 마냥 키울 수는 없습니다.",
      clarityLevels: ["첨예한 대립","의견 갈림","한쪽 우세","명확"],
    },
    zh: {
      yes: "是", no: "否", stakesLevels: ["低", "中", "高"], strengthLevels: ["低", "中", "高"],
      panelResult: (size, label) => label.startsWith("> ")
        ? `在这个独立抽样模型中，随机抽取的 ${size} 人评估组复现总体多数决定的概率高于 ${label.slice(2)}。`
        : `在这个独立抽样模型中，随机抽取的 ${size} 人评估组复现总体多数决定的概率为 ${label}。`,
      selectedCase: (stakes, strength) => `已选示例：出错代价${stakes}，对当前答案的把握程度${strength}。拖动圆点或使用方向键。`,
      stopCase: "出错代价低", stop: "停止",
      stopExplanation: "在这个示例中，出错代价不足以支持继续投入评估。",
      replaceCase: "重要决策 · 当前答案较弱", replace: "生成新答案",
      replaceExplanation: "出错代价足以支持继续评估，但与其再次评估当前答案，不如生成并评估一个新答案。",
      recheckCase: "重要决策 · 当前答案较有把握", recheck: "重新评估当前答案",
      recheckExplanation: "还需要更多依据，而当前答案也值得再评估一次。",
      anotherPanel: "继续评估", appeal: "发起申诉", noAppeal: "不申诉",
      missedAppeal: "有必要申诉，但无人发起", missedCopy: "在这组数值下，继续评估对系统有利，但参与者没有发起申诉的动力。",
      excessAppeal: "不必要的申诉", excessCopy: "系统更希望停止，但参与者仍有动力发起申诉。",
      aligned: "双方选择一致", alignedContinue: "系统和参与者都选择继续评估。", alignedStop: "系统和参与者都选择停止。",
      advFlipped: "{pct}% 被翻转",
      advBelow: "最坏情况：对抗者把群体中 {flipped}% 的票从“是”翻转为“否”。随机抽取的 {size} 人评估组仍有 {label} 的概率站在诚实多数一边。",
      advTie: "对抗份额恰好抹平了诚实一方的优势：被操控后的群体正好五五开，评估组的决定形同抛硬币。",
      advAbove: "对抗份额超过了诚实一方的优势：被操控后的群体已倒向“否”，评估组越大，这个被翻转的决定反而越稳固；此时评估组站到诚实多数一边的概率，只剩 {label}。",
      clarityReadout: "{pct}% 同意 · {word}",
      stopTooRisky: "风险过高",
      stopSweet: "最佳区间",
      stopOverkill: "过度投入",
      stopRisk: "风险",
      stopFees: "费用",
      stopTotal: "总计",
      stopXAxis: "停止轮次的评估者人数",
      stopAction: "在 {K} 名评估者的轮次停止",
      stopCopy: "在一个{word}的问题上，有 {L} 的价值面临风险：{K} 名评估者的轮次全部成本为 {total}；把评估组扩大到 {nextK} 名要再付 {fees} 的费用，却只减少 {risk} 的风险。",
      dialRhoLabel: "{rho} 保证金",
      dialTitle: "申诉者保本所需的成功概率",
      dialCeiling: "≈50% 上限：重新执行一次 3–2 形同抛硬币",
      dialReachable: "诚实重新执行可达",
      dialPrivate: "需要私有信息",
      dialCosts: "成本余量",
      dialToday: "67% · 按当前的 1.5×",
      dialThreshold: "门槛 {pct}",
      dialAxisTitle: "回报倍数",
      dialDead: "失效 · 门槛超出上限",
      dialWindow: "安全区间",
      dialSpam: "滥发申诉有利可图",
      dialFloorTick: "2× · 知情者保本点",
      dialSpamTick: "≈2.9× · 盲目申诉期望收益转正",
      dialDeadAction: "在边缘决定上机制失效",
      dialDeadCopy: "在 {rho} 下，{pct} 的门槛已超出诚实重新执行一次 3–2 所能支持的约 50% 上限。知情的申诉者没有理由发起申诉；只有掌握确凿私有信息的人才会行动，因此实测申诉率接近零，并不奇怪。",
      dialWindowAction: "处于安全区间内",
      dialWindowCopy: "在 {rho} 下，{pct} 的门槛落在诚实可达的区间内，还留出 {room} 个百分点来覆盖申诉者的实际成本。这时，对边缘决定发起知情申诉是划算的，盲目滥发申诉照样亏钱。",
      dialSpamAction: "滥发申诉开始有利可图",
      dialSpamCopy: "在 {rho} 下，对每一个边缘决定都盲目申诉，零投入也能盈利。超过 ≈2.9× 之后，多出来的回报买不到更认真的核查，只会招来一堆碰运气的申诉，所以回报并不是定得越高越好。",
      clarityLevels: ["争议激烈","有争议","偏向一方","十分明确"],
    },
    ru: {
      yes: "ДА", no: "НЕТ", stakesLevels: ["НИЗКАЯ", "СРЕДНЯЯ", "ВЫСОКАЯ"], strengthLevels: ["НИЗКАЯ", "СРЕДНЯЯ", "ВЫСОКАЯ"],
      panelResult: (size, label) => label.startsWith("> ")
        ? `В этой модели независимых выборок случайная группа из ${size} оценщиков повторяет решение большинства совокупности более чем в ${label.slice(2)} случаев.`
        : `В этой модели независимых выборок случайная группа из ${size} оценщиков повторяет решение большинства совокупности в ${label} случаев.`,
      selectedCase: (stakes, strength) => `Выбранный пример: цена ошибки — ${stakes.toLowerCase()}, убедительность ответа — ${strength.toLowerCase()}. Перетащите точку или используйте клавиши со стрелками.`,
      stopCase: "НЕВЫСОКАЯ ЦЕНА ОШИБКИ", stop: "ОСТАНОВИТЬСЯ",
      stopExplanation: "В этом примере возможная ошибка не оправдывает затрат на дополнительную проверку.",
      replaceCase: "ВАЖНАЯ ЗАДАЧА · СЛАБЫЙ ТЕКУЩИЙ ОТВЕТ", replace: "ПОЛУЧИТЬ НОВЫЙ ОТВЕТ",
      replaceExplanation: "Высокая цена ошибки оправдывает дополнительные затраты, но лучше получить новый ответ, чем снова проверять текущий.",
      recheckCase: "ВАЖНАЯ ЗАДАЧА · УБЕДИТЕЛЬНЫЙ ТЕКУЩИЙ ОТВЕТ", recheck: "ПРОВЕРИТЬ ОТВЕТ ЕЩЁ РАЗ",
      recheckExplanation: "Нужны дополнительные данные, и текущий ответ стоит проверить ещё раз.",
      anotherPanel: "ПРОДОЛЖИТЬ ПРОВЕРКУ", appeal: "ПОДАТЬ АПЕЛЛЯЦИЮ", noAppeal: "НЕ ПОДАВАТЬ АПЕЛЛЯЦИЮ",
      missedAppeal: "УПУЩЕННАЯ АПЕЛЛЯЦИЯ", missedCopy: "Интересы системы и участников в этом случае расходятся.",
      excessAppeal: "ЛИШНЯЯ АПЕЛЛЯЦИЯ", excessCopy: "Участник хочет подать апелляцию, хотя системе выгоднее остановиться.",
      aligned: "РЕШЕНИЯ СОВПАДАЮТ", alignedContinue: "И системе, и участнику выгодно продолжить проверку.", alignedStop: "И системе, и участнику выгодно остановиться.",
      advFlipped: "{pct}% ПОДМЕНЕНО",
      advBelow: "Худший случай: злоумышленники меняют {flipped}% голосов совокупности с «да» на «нет». Случайная группа из {size} оценщиков всё же оказывается на стороне честного большинства в {label} случаев.",
      advTie: "Доля злоумышленников в точности стирает перевес честных голосов: искажённая совокупность разделена 50/50, а решение группы равносильно подбрасыванию монеты.",
      advAbove: "Доля злоумышленников превышает перевес честных голосов: искажённая совокупность теперь склоняется к «нет», и чем больше группа, тем прочнее закрепляется перевёрнутое решение. На стороне честного большинства группа оказывается лишь в {label} случаев.",
      clarityReadout: "{pct}% согласны · {word}",
      stopTooRisky: "РИСКОВАННО",
      stopSweet: "ОПТИМУМ",
      stopOverkill: "ПЕРЕБОР",
      stopRisk: "РИСК",
      stopFees: "ПЛАТА",
      stopTotal: "ИТОГ",
      stopXAxis: "РАЗМЕР ГРУППЫ В РАУНДЕ ОСТАНОВКИ",
      stopAction: "ОСТАНОВИТЕСЬ НА РАУНДЕ ИЗ {K} ОЦЕНЩИКОВ",
      stopCopy: "Когда на кону {L}, а вопрос — {word}, раунд из {K} оценщиков в сумме обходится в {total}. Эскалация до {nextK} оценщиков добавит {fees} платы, а риск снизит лишь на {risk}.",
      dialRhoLabel: "{rho} залога",
      dialTitle: "КАКАЯ УВЕРЕННОСТЬ ОКУПАЕТ АПЕЛЛЯЦИЮ",
      dialCeiling: "ПОТОЛОК ≈50%: ПОВТОР 3–2 — КАК МОНЕТКА",
      dialReachable: "ДОСТИЖИМО ЧЕСТНОЙ ПЕРЕПРОВЕРКОЙ",
      dialPrivate: "НУЖНА ЗАКРЫТАЯ ИНФОРМАЦИЯ",
      dialCosts: "НА ИЗДЕРЖКИ",
      dialToday: "67% · ПРИ НЫНЕШНИХ 1,5×",
      dialThreshold: "ПОРОГ {pct}",
      dialAxisTitle: "МНОЖИТЕЛЬ ВЫПЛАТЫ",
      dialDead: "МЁРТВАЯ ЗОНА · ПОТОЛОК НЕДОСТИЖИМ",
      dialWindow: "ОКНО",
      dialSpam: "СПАМ ВЫГОДЕН",
      dialFloorTick: "2× · порог информированных",
      dialSpamTick: "≈2,9× · слепые апелляции в плюсе",
      dialDeadAction: "НА ПОГРАНИЧНЫХ РЕШЕНИЯХ МЕХАНИЗМ НЕ РАБОТАЕТ",
      dialDeadCopy: "При {rho} порог {pct} лежит выше ≈50% — максимума, который вообще может оправдать честная перепроверка решения 3–2. Ни один информированный апеллянт не может рационально подать апелляцию; действует только тот, кто уверен благодаря закрытой информации. Поэтому апелляций почти не видно — механизм на это и рассчитан, равнодушие участников тут ни при чём.",
      dialWindowAction: "ВНУТРИ ОКНА",
      dialWindowCopy: "При {rho} порог {pct} попадает в полосу, достижимую честной перепроверкой, и на реальные издержки апеллянта остаётся ещё {room} п. п. запаса. Информированные апелляции по пограничным решениям становятся рациональными; слепой спам по-прежнему убыточен.",
      dialSpamAction: "СПАМ СТАНОВИТСЯ ВЫГОДНЫМ",
      dialSpamCopy: "При {rho} слепая апелляция на каждое пограничное решение приносит прибыль без всякой работы. После ≈2,9× выплата перестаёт покупать проверку и начинает покупать шум.",
      clarityLevels: ["крайне спорный","спорный","с явным перевесом","однозначный"],
    },
    tr: {
      yes: "EVET", no: "HAYIR", stakesLevels: ["DÜŞÜK", "ORTA", "YÜKSEK"], strengthLevels: ["DÜŞÜK", "ORTA", "YÜKSEK"],
      panelResult: (size, label) => label.startsWith("> ")
        ? `Bu bağımsız örnekleme modelinde, rastgele seçilmiş ${size} kişilik bir panelin popülasyon çoğunluğuyla aynı tarafa ulaşma oranı ${label.slice(2)} değerini aşıyor.`
        : `Bu bağımsız örnekleme modelinde, rastgele seçilmiş ${size} kişilik bir panelin popülasyon çoğunluğuyla aynı tarafa ulaşma oranı ${label}.`,
      selectedCase: (stakes, strength) => `Seçili örnek: yanılma bedeli ${stakes.toLowerCase()}, mevcut yanıtın gücü ${strength.toLowerCase()}. Noktayı sürükle ya da ok tuşlarını kullan.`,
      stopCase: "DÜŞÜK RİSKLİ ÖRNEK", stop: "DUR",
      stopExplanation: "Bu örnekte yanılmanın bedeli, bir değerlendirme daha satın almayı haklı çıkarmıyor.",
      replaceCase: "ÖNEMLİ KARAR · ZAYIF MEVCUT YANIT", replace: "YENİ BİR YANITLA BAŞLA",
      replaceExplanation: "Riskteki tutar bir deneme daha yapmayı haklı çıkarıyor; ama mevcut yanıt tutmaya değmez.",
      recheckCase: "ÖNEMLİ KARAR · UMUT VEREN MEVCUT YANIT", recheck: "BU YANITI YENİDEN SINA",
      recheckExplanation: "Riskteki tutar daha fazla kanıtı haklı çıkarıyor ve mevcut yanıt tutmaya değer.",
      anotherPanel: "BİR PANEL DAHA", appeal: "İTİRAZ ET", noAppeal: "İTİRAZ YOK",
      missedAppeal: "YAPILMAYAN İTİRAZ", missedCopy: "Sistem bir panele daha değer veriyor; ama hiçbir birey onu tetiklemeyi göze almıyor.",
      excessAppeal: "GEREKSİZ İTİRAZ", excessCopy: "Sistem durmayı yeğlerken katılımcı yine de itiraz etmek istiyor.",
      aligned: "SEÇİMLER ÖRTÜŞÜYOR", alignedContinue: "Hem sistem hem katılımcı bir panel daha diyor.", alignedStop: "Hem sistem hem katılımcı durmayı seçiyor.",
      advFlipped: "%{pct} ÇEVRİLDİ",
      advBelow: "En kötü durum: kötü niyetliler popülasyonda %{flipped} oranında oyu EVET'ten HAYIR'a çeviriyor. Rastgele {size} kişilik panel yine de {label} olasılıkla dürüst çoğunluğun tarafına ulaşıyor.",
      advTie: "Kötü niyetli pay, dürüst farkı tam olarak siliyor: bozulmuş popülasyon 50/50 bölünmüş durumda ve panelin kararı yazı tura.",
      advAbove: "Kötü niyetli pay dürüst farkı aşıyor: bozulmuş popülasyon artık HAYIR'a eğilimli ve panel büyüdükçe devrilen karar daha da sağlamlaşıyor. Panel, dürüst çoğunluğun tarafına yalnızca {label} olasılıkla ulaşıyor.",
      clarityLevels: ["kıyasıya tartışmalı", "tartışmalı", "bir yana eğilimli", "net"],
      clarityReadout: "%{pct} hemfikir · {word}",
      stopTooRisky: "FAZLA RİSKLİ", stopSweet: "TATLI NOKTA", stopOverkill: "AŞIRIYA KAÇAR",
      stopRisk: "RİSK", stopFees: "ÜCRET", stopTotal: "TOPLAM",
      stopXAxis: "DURDUĞUN TURUN PANEL BÜYÜKLÜĞÜ",
      stopAction: "{K} DEĞERLENDİRİCİLİK TURDA DUR",
      stopCopy: "Riskte {L} olan {word} bir soruda {K} değerlendiricide durmak en iyisi: {feesK} ücret artı geriye kalan {riskK} risk. Sonraki tur ({nextK}) {fees} ekleyip riski yalnızca {risk} azaltır. Değmez.",
      stopCopyMax: "Riskte {L} olan {word} bir soruda en büyük panel bile masrafını çıkarıyor: {feesK} ücret, geriye {riskK} risk. Bundan büyük tur yok.",
      dialRhoLabel: "teminatın {rho} katı",
      dialTitle: "İTİRAZ EDENİN BAŞABAŞ İNANCI",
      dialCeiling: "≈%50 TAVAN: 3–2'Yİ YENİDEN ÇALIŞTIRMAK YAZI TURA DEMEK",
      dialReachable: "DÜRÜST YENİDEN ÇALIŞTIRMAYLA ULAŞILABİLİR",
      dialPrivate: "ÖZEL BİLGİ GEREKTİRİR",
      dialCosts: "MASRAFLAR BUNU YER",
      dialToday: "%67 · BUGÜNKÜ 1,5× İLE",
      dialThreshold: "EŞİK {pct}",
      dialAxisTitle: "ÖDEME KATSAYISI",
      dialDead: "ÖLÜ BÖLGE · TAVANA ULAŞILAMIYOR", dialWindow: "PENCERE", dialSpam: "SPAM KAZANDIRIYOR",
      dialFloorTick: "2× · bilgili başabaş",
      dialSpamTick: "≈2,9× · kör itiraz artıya geçer",
      dialDeadAction: "KIL PAYI KARARLARDA MEKANİZMA ÖLÜ",
      dialDeadCopy: "{rho} düzeyinde {pct} eşiği, 3–2'lik bir kararın dürüst yeniden çalıştırmasının haklı çıkarabileceği ≈%50'nin ötesinde kalıyor. Bilgiye dayanan hiçbir itiraz rasyonel değil; yalnızca kendine özel bilgisi olan harekete geçer. Sıfıra yakın ölçülen itiraz oranı tasarımın geometrisidir, katılımcıların kayıtsızlığı değil.",
      dialWindowAction: "PENCERENİN İÇİNDE",
      dialWindowCopy: "{rho} düzeyinde {pct} eşiği, dürüstçe ulaşılabilir bandın içinde ve itiraz edenin gerçek masrafları için {room} puanlık pay bırakıyor. Kıl payı kararlarda bilgili itiraz rasyonel hâle geliyor; kör spam hâlâ zarar ediyor.",
      dialSpamAction: "SPAM KÂRA GEÇİYOR",
      dialSpamCopy: "{rho} düzeyinde, her kıl payı karara körlemesine itiraz etmek sıfır emekle kâr getiriyor. ≈2,9× sonrasında ödeme artık inceleme değil, gürültü satın alıyor — işte bu yüzden daha cömert ödeme daha iyi demek değil.",
    },
  };
  const copy = { ...localizedCopy.en, ...(localizedCopy[locale] || {}) };
  const compactCopy = {
    en: {
      advBelow: "Honest majority wins {label} of {size}-person panels.",
      advTie: "Honest margin erased: the panel is a coin flip.",
      advAbove: "Majority overturned: panels preserve it only {label} of the time.",
      stopAction: "STOP AT {K} EVALUATORS",
      stopCopy: "Cheapest: {feesK} in fees, {riskK} of risk left. The next round adds {fees} in fees, removes only {risk}.",
      stopCopyMax: "Cheapest: {feesK} in fees, {riskK} of risk left. This is the largest round.",
      dialDeadCopy: "{pct} exceeds the honest ≈50% ceiling. Informed appeals cannot break even.",
      dialWindowCopy: "At {pct}, informed appeals pay; blind spam does not.",
      dialSpamCopy: "Above ≈2.9×, blind appeals are profitable. More payout now buys noise.",
    },
    es: {
      advBelow: "La mayoría honesta gana el {label} de los paneles de {size}.",
      advTie: "Margen honesto anulado: la decisión del grupo es una moneda al aire.",
      advAbove: "Mayoría honesta invertida: solo se conserva el {label} de las veces.",
      stopAction: "DETENERSE EN {K} EVALUADORES",
      stopCopy: "Coste mínimo: {total}. La siguiente ronda añade {fees}.",
      dialDeadCopy: "El {pct} supera el techo honesto de ≈50%. Una apelación informada no compensa.",
      dialWindowCopy: "Con {pct}, apelar con información compensa; el spam a ciegas no.",
      dialSpamCopy: "Por encima de ≈2,9×, apelar a ciegas es rentable y solo añade ruido.",
    },
    ko: {
      advBelow: "{size}명 그룹이 정직한 다수 결정을 재현할 확률은 {label}입니다.",
      advTie: "정직한 다수의 우위가 사라져 그룹의 결정은 동전 던지기와 같습니다.",
      advAbove: "다수 결정이 뒤집혔습니다. 그룹이 정직한 결정을 지킬 확률은 {label}뿐입니다.",
      stopAction: "{K}명에서 중단",
      stopCopy: "최저 비용은 {total}입니다. 다음 라운드는 수수료가 {fees} 늘어납니다.",
      dialDeadCopy: "{pct}는 정직한 ≈50% 상한을 넘어, 근거 있는 이의 제기로는 본전도 찾지 못합니다.",
      dialWindowCopy: "임계값 {pct}에서는 근거 있는 이의 제기만 이익을 봅니다. 무작정 내면 여전히 손해입니다.",
      dialSpamCopy: "≈2.9×를 넘으면 무작정 낸 이의 제기도 이익이 되어 소음만 늘어납니다.",
    },
    zh: {
      advBelow: "{size} 人评估组复现诚实多数决定的概率为 {label}。",
      advTie: "诚实多数优势被抹去，评估组的决定等同于抛硬币。",
      advAbove: "多数决定已被逆转；评估组保留诚实决定的概率仅为 {label}。",
      stopAction: "在 {K} 人时停止",
      stopCopy: "最低总成本：{total}。下一轮增加 {fees} 费用。",
      dialDeadCopy: "{pct} 超过诚实重新执行约 50% 的上限，知情申诉无法收支平衡。",
      dialWindowCopy: "阈值为 {pct} 时，知情申诉有利可图，盲目申诉仍会亏损。",
      dialSpamCopy: "超过约 2.9× 后，盲目申诉也能获利，只会增加噪声。",
    },
    ru: {
      advBelow: "Группа из {size} оценщиков сохраняет честное большинство в {label} случаев.",
      advTie: "Честный перевес исчез: решение группы превращается в подбрасывание монеты.",
      advAbove: "Большинство перевёрнуто: группа сохраняет честный результат лишь в {label} случаев.",
      stopAction: "ОСТАНОВИТЬСЯ НА {K} ОЦЕНЩИКАХ",
      stopCopy: "Минимальная стоимость: {total}. Следующий раунд добавит {fees}.",
      dialDeadCopy: "Порог {pct} выше честного потолка ≈50%. Информированная апелляция не окупается.",
      dialWindowCopy: "При пороге {pct} информированные апелляции выгодны, слепой спам — нет.",
      dialSpamCopy: "Выше ≈2,9× слепые апелляции выгодны и создают лишь шум.",
    },
    tr: {
      advBelow: "{size} kişilik panellerde dürüst çoğunluk {label} oranında kazanıyor.",
      advTie: "Dürüst fark silindi: panelin kararı yazı tura.",
      advAbove: "Çoğunluk devrildi: paneller onu yalnızca {label} oranında koruyor.",
      stopAction: "{K} DEĞERLENDİRİCİDE DUR",
      stopCopy: "En ucuzu: {feesK} ücret, kalan risk {riskK}. Sonraki tur {fees} ekler, yalnızca {risk} azaltır.",
      stopCopyMax: "En ucuzu: {feesK} ücret, kalan risk {riskK}. Bundan büyük tur yok.",
      dialDeadCopy: "{pct}, dürüst ≈%50 tavanını aşıyor. Bilgiye dayalı itiraz başabaşı tutturamaz.",
      dialWindowCopy: "{pct} eşiğinde bilgiye dayalı itiraz kazandırır; kör spam kazandırmaz.",
      dialSpamCopy: "≈2,9× üzerinde kör itiraz kârlı. Fazla ödeme artık gürültü satın alıyor.",
    },
  };
  const compact = { ...compactCopy.en, ...(compactCopy[locale] || {}) };
  const tpl = (str, vars) => str.replace(/\{(\w+)\}/g, (m, k) => vars[k] !== undefined ? vars[k] : m);
  // Decimal commas for es, ru, and tr (ru and tr keep en-US money grouping;
  // probabilities still localize via the per-locale hook).
  const fmtDec = (s) => (locale === "es" || locale === "ru" || locale === "tr") ? String(s).replace(".", ",") : String(s);
  // Turkish puts the percent sign before the number (%55); every JS-written
  // percentage funnels through this so runtime values match the static copy.
  const fmtPct = (s) => locale === "tr" ? String(s).replace(/(≈?>?\s?)(\d[\d.,]*)%/g, (m, pre, n) => `${pre}%${n}`) : String(s);
  const langTag = locale === "es" ? "es-ES" : "en-US";

  const intro = document.querySelector(".critical-onboard");
  const scenes = [...document.querySelectorAll("[data-intro-scene]")];
  const progress = [...document.querySelectorAll("[data-intro-progress]")];
  const skip = document.querySelector(".bi-skip");
  const replay = document.querySelector(".bi-replay");
  const arrowPrev = document.querySelector(".bi-arrow-prev");
  const arrowNext = document.querySelector(".bi-arrow-next");
  // Reading time grows with each scene's copy and visual complexity.
  // One entry per scene transition: five scenes, four transitions.
  const sceneDurations = [4500, 3100, 4200, 5200];
  const timings = [0];
  sceneDurations.forEach((duration) => timings.push(timings[timings.length - 1] + duration));
  let introTimers = [];
  let currentIntroStep = 1;

  const showIntro = (step) => {
    currentIntroStep = step;
    intro.dataset.step = String(step);
    scenes.forEach((scene) => {
      const active = Number(scene.dataset.introScene) === step;
      scene.classList.toggle("active", active);
      scene.setAttribute("aria-hidden", String(!active));
    });
    progress.forEach((item) => {
      const value = Number(item.dataset.introProgress);
      item.classList.toggle("active", value === step);
      item.classList.toggle("complete", value < step);
      if (value === step) item.setAttribute("aria-current", "step");
      else item.removeAttribute("aria-current");
    });
    const complete = step === scenes.length;
    skip.hidden = complete;
    replay.hidden = !complete;
    if (arrowPrev) arrowPrev.disabled = step === 1;
    if (arrowNext) arrowNext.disabled = complete;
  };

  const stopIntro = () => {
    introTimers.forEach(window.clearTimeout);
    introTimers = [];
  };

  const playIntro = () => {
    stopIntro();
    showIntro(1);
    timings.slice(1).forEach((delay, index) => {
      introTimers.push(window.setTimeout(() => showIntro(index + 2), delay));
    });
  };

  skip.addEventListener("click", () => {
    stopIntro();
    showIntro(scenes.length);
  });
  replay.addEventListener("click", playIntro);
  progress.forEach((item) => item.addEventListener("click", () => {
    stopIntro();
    showIntro(Number(item.dataset.introProgress));
  }));
  if (arrowPrev) arrowPrev.addEventListener("click", () => {
    stopIntro();
    if (currentIntroStep > 1) showIntro(currentIntroStep - 1);
  });
  if (arrowNext) arrowNext.addEventListener("click", () => {
    stopIntro();
    if (currentIntroStep < scenes.length) showIntro(currentIntroStep + 1);
  });

  // Horizontal swipes move the story. Vertical gestures remain native so the
  // reader can leave the story and continue down the page.
  const swipeSurface = intro.querySelector(".bi-stage");
  let swipeStart = null;
  swipeSurface.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
    const target = event.target;
    if (target instanceof Element && target.closest("a, button, input, select, textarea, [contenteditable='true']")) return;
    stopIntro();
    swipeStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
  });
  window.addEventListener("pointerup", (event) => {
    if (!swipeStart || event.pointerId !== swipeStart.id) return;
    const deltaX = event.clientX - swipeStart.x;
    const deltaY = event.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;
    const nextStep = currentIntroStep + (deltaX < 0 ? 1 : -1);
    if (nextStep >= 1 && nextStep <= scenes.length) showIntro(nextStep);
  });
  window.addEventListener("pointercancel", (event) => {
    if (swipeStart && event.pointerId === swipeStart.id) swipeStart = null;
  });

  window.addEventListener("keydown", (event) => {
    const target = event.target;
    const progressControl = target instanceof HTMLElement && target.closest("[data-intro-progress]");
    if (target instanceof HTMLElement && !progressControl && target.closest("input, select, textarea, button, a, [contenteditable='true']")) return;
    const bounds = intro.getBoundingClientRect();
    if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;

    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (forward && currentIntroStep < scenes.length) {
      event.preventDefault();
      stopIntro();
      showIntro(currentIntroStep + 1);
    } else if (backward && currentIntroStep > 1) {
      event.preventDefault();
      stopIntro();
      showIntro(currentIntroStep - 1);
    }
  });
  // Always open on slide 1. Visitors with reduced motion just don't autoplay;
  // they step through with the arrows, dots, keys, or swipes.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) showIntro(1);
  else playIntro();

  const reversalProbability = (probabilityYes, size) => {
    const lastReversingCount = Math.floor(size / 2);
    let logTerm = size * Math.log(1 - probabilityYes);
    let logSum = logTerm;
    for (let yesVotes = 0; yesVotes < lastReversingCount; yesVotes += 1) {
      logTerm += Math.log(size - yesVotes) - Math.log(yesVotes + 1)
        + Math.log(probabilityYes) - Math.log(1 - probabilityYes);
      const larger = Math.max(logSum, logTerm);
      logSum = larger + Math.log(Math.exp(logSum - larger) + Math.exp(logTerm - larger));
    }
    return Math.exp(logSum);
  };

  const probabilityLabel = (probability) => {
    const percent = probability * 100;
    if (percent > 99.999999) return "> 99.999999%";
    if (percent < 0.000005) return "< 0.00001%";
    if (percent < 0.01) return `${percent.toFixed(5)}%`;
    if (percent < 1) return `${percent.toFixed(2)}%`;
    return `${percent.toFixed(1)}%`;
  };

  const localizeProbabilityLabel = (label) => ["es", "ru", "tr"].includes(locale) ? label.replace(".", ",") : label;

  // Worst-case variant: non-adaptive corruption flips a declared share of the
  // population from YES to NO before the panel is sampled, so the panel draws
  // from the corrupted share (honest YES minus flipped).
  const advAgreement = document.querySelector("#p1b-agreement");
  if (advAgreement) {
    const advAgreementOutput = document.querySelector("#p1b-agreement-output");
    const advShare = document.querySelector("#p1b-adversary");
    const advShareOutput = document.querySelector("#p1b-adversary-output");
    const advRepeatOutput = document.querySelector("#p1b-risk");
    const advRepeatFill = document.querySelector("#p1b-risk-fill");
    const advRepeatCopy = document.querySelector("#p1b-risk-copy");
    const advYesBar = document.querySelector("#p1b-yes-bar");
    const advFlipBar = document.querySelector("#p1b-adv-bar");
    const advYesLabel = document.querySelector("#p1b-yes-label");
    const advFlipLabel = document.querySelector("#p1b-adv-label");
    const advNoLabel = document.querySelector("#p1b-no-label");
    const advSizeButtons = [...document.querySelectorAll("[data-p1b-size]")];
    let advPanelSize = 47;

    const updateAdversary = () => {
      const honestYes = Number(advAgreement.value);
      const flipped = Number(advShare.value);
      const corruptedYes = honestYes - flipped;
      const repeatProbability = Math.min(1, Math.max(0, 1 - reversalProbability(corruptedYes / 100, advPanelSize)));
      const label = fmtPct(localizeProbabilityLabel(probabilityLabel(repeatProbability)));
      advAgreementOutput.textContent = fmtPct(`${honestYes}%`);
      advShareOutput.textContent = fmtPct(`${flipped}%`);
      advYesBar.style.width = `${corruptedYes}%`;
      advFlipBar.style.width = `${flipped}%`;
      advYesLabel.textContent = fmtPct(`${corruptedYes}% ${copy.yes}`);
      advFlipLabel.textContent = tpl(copy.advFlipped, { pct: flipped });
      advNoLabel.textContent = fmtPct(`${100 - honestYes}% ${copy.no}`);
      advRepeatOutput.textContent = label;
      advRepeatFill.style.width = `${Math.max(.2, repeatProbability * 100)}%`;
      if (corruptedYes > 50) {
        advRepeatCopy.textContent = tpl(isCompactPhone() ? compact.advBelow : copy.advBelow, { flipped, size: advPanelSize, label });
      } else if (corruptedYes === 50) {
        advRepeatCopy.textContent = isCompactPhone() ? compact.advTie : copy.advTie;
      } else {
        advRepeatCopy.textContent = tpl(isCompactPhone() ? compact.advAbove : copy.advAbove, { label });
      }
    };

    advAgreement.addEventListener("input", updateAdversary);
    advShare.addEventListener("input", updateAdversary);
    advSizeButtons.forEach((button) => button.addEventListener("click", () => {
      advPanelSize = Number(button.dataset.p1bSize);
      advSizeButtons.forEach((item) => item.classList.toggle("active", item === button));
      updateAdversary();
    }));
    updateAdversary();
  }

  // Part II stopping-rule lab: price each protocol round (fees + expected
  // loss from a wrong call) and stop at the cheapest one. Illustrative
  // independent-evaluator model, not the paper's calibrated planner.
  const stopStakes = document.querySelector("#p2s-stakes");
  if (stopStakes) {
    const SEAT = 0.10;
    const RINGS = [5, 11, 23, 47, 95, 191, 383, 767, 1537];
    const stopClarity = document.querySelector("#p2s-clarity");
    const stopStakesOut = document.querySelector("#p2s-stakes-output");
    const stopClarityOut = document.querySelector("#p2s-clarity-output");
    const stopSvg = document.querySelector("#p2s-svg");
    const stopAction = document.querySelector("#p2s-action");
    const stopCopy = document.querySelector("#p2s-copy");
    const presetButtons = [...document.querySelectorAll("[data-p2s-preset]")];
    const stopMoney = (x) => {
      // Turkish money reads "9,50 $" / "2.000 $": symbol after, tr-TR grouping,
      // so runtime readouts agree with the static preset chips.
      const value = x < 20 ? fmtDec(x.toFixed(2).replace(/\.00$/, "")) : Math.round(x).toLocaleString(locale === "tr" ? "tr-TR" : langTag);
      return locale === "tr" ? `${value} $` : `$${value}`;
    };
    const clarityWord = (v) => copy.clarityLevels[v < 62 ? 0 : v < 72 ? 1 : v < 82 ? 2 : 3];

    const updateStopLab = () => {
      const CM = isCompactPhone();
      const L = Number(stopStakes.value) * 50;
      const agree = Number(stopClarity.value);
      const p = agree / 100;
      stopStakesOut.textContent = stopMoney(L);
      stopClarityOut.textContent = tpl(copy.clarityReadout, { pct: agree, word: clarityWord(agree) });
      const pts = RINGS.map((K, i) => {
        const risk = L * reversalProbability(p, K);
        return { K, i, risk, fees: SEAT * K, total: SEAT * K + risk };
      });
      let best = pts[0];
      pts.forEach((q) => { if (q.total < best.total) best = q; });
      const N = pts.length;
      const maxY = Math.max(...pts.map((q) => q.total));
      const PL = 74, PR = 16, PT = 20, PB = 44, H = 300 - PT - PB;
      const X = (i) => PL + (i + .5) / N * (720 - PL - PR);
      const Y = (val) => (300 - PB) - (val / maxY) * H;
      const path = (key) => pts.map((q, i) => `${i ? "L" : "M"}${X(i).toFixed(1)},${Y(q[key]).toFixed(1)}`).join("");
      const sweet = pts.filter((q) => q.total <= best.total * 1.05);
      const slot = (720 - PL - PR) / N / 2;
      const sweetL = X(sweet[0].i) - slot, sweetR = X(sweet[sweet.length - 1].i) + slot;
      const zoneLabel = (x1, x2, text, color, minW = CM ? 190 : 118) => (x2 - x1) > minW
        ? `<text x="${(x1 + x2) / 2}" y="${PT + 18}" font-size="${CM ? 19 : 12}" font-weight="900" letter-spacing=".08em" text-anchor="middle" fill="${color}">${text}</text>` : "";
      const lastPt = pts[N - 1];
      stopSvg.innerHTML = `
        <rect x="${PL}" y="${PT}" width="${Math.max(0, sweetL - PL)}" height="${H}" fill="#D22F2F" opacity=".09"/>
        <rect x="${sweetL}" y="${PT}" width="${Math.max(4, sweetR - sweetL)}" height="${H}" fill="#0B8A47" opacity=".13"/>
        <rect x="${sweetR}" y="${PT}" width="${Math.max(0, 720 - PR - sweetR)}" height="${H}" fill="#8A8A86" opacity=".12"/>
        ${zoneLabel(PL, sweetL, copy.stopTooRisky, "#BD2A2A")}
        ${zoneLabel(sweetL, sweetR, copy.stopSweet, "#09753C", CM ? 84 : 52)}
        ${zoneLabel(sweetR, 720 - PR, copy.stopOverkill, "#606060")}
        ${[0, .5, 1].map((f) => { const t = maxY * f; return `<line x1="${PL}" y1="${Y(t)}" x2="${720 - PR}" y2="${Y(t)}" stroke="#DCDCD8"/><text x="${PL - 8}" y="${Y(t) + 4}" font-size="${CM ? 19 : 12}" text-anchor="end" fill="#606060">${stopMoney(t)}</text>`; }).join("")}
        ${pts.map((q, i) => `<text x="${X(i)}" y="${300 - PB + 18}" font-size="${CM ? 19 : 12}" font-weight="${q.K === best.K ? 900 : 400}" text-anchor="middle" fill="${q.K === best.K ? "#070707" : "#606060"}">${q.K}</text>`).join("")}
        <text x="${(PL + 720 - PR) / 2}" y="${300 - 5}" font-size="${CM ? 19 : 12}" font-weight="800" text-anchor="middle" fill="#606060">${copy.stopXAxis}</text>
        <path d="${path("risk")}" fill="none" stroke="#D22F2F" stroke-width="2" stroke-dasharray="5 4"/>
        <path d="${path("fees")}" fill="none" stroke="#8A8A86" stroke-width="1.5" stroke-dasharray="2 3"/>
        <path d="${path("total")}" fill="none" stroke="#070707" stroke-width="3"/>
        <text x="${X(2) + 10}" y="${Y(pts[2].risk) - 10}" font-size="${CM ? 19 : 12}" font-weight="800" fill="#BD2A2A">${copy.stopRisk}</text>
        <text x="${X(6)}" y="${Y(pts[6].fees) + 24}" font-size="${CM ? 19 : 12}" font-weight="800" text-anchor="middle" fill="#606060">${copy.stopFees}</text>
        <text x="${X(N - 1) - 6}" y="${Y(lastPt.total) - 14}" font-size="${CM ? 20 : 12.5}" font-weight="900" text-anchor="end" fill="#070707">${copy.stopTotal}</text>
        ${pts.map((q, i) => `<circle cx="${X(i)}" cy="${Y(q.total)}" r="4" fill="${q.K === best.K ? "#110FFF" : "white"}" stroke="#070707" stroke-width="2"/>`).join("")}
        <circle cx="${X(best.i)}" cy="${Y(best.total)}" r="8" fill="#110FFF" stroke="#070707" stroke-width="3"/>
        <text x="${Math.min(X(best.i) + 14, 560)}" y="${Math.max(PT + 38, Y(best.total) - 16)}" font-size="${CM ? 22 : 15}" font-weight="800" fill="#070707">${stopMoney(best.total)}</text>`;
      const atMax = best.i === N - 1;
      const next = pts[Math.min(best.i + 1, N - 1)];
      const stopVars = { L: stopMoney(L), word: clarityWord(agree), K: best.K, total: stopMoney(best.total), feesK: stopMoney(best.fees), riskK: stopMoney(best.risk), nextK: next.K, fees: stopMoney(SEAT * (next.K - best.K)), risk: stopMoney(Math.max(0, best.risk - next.risk)) };
      const dict = isCompactPhone() ? compact : copy;
      stopAction.textContent = tpl(dict.stopAction, stopVars);
      stopCopy.textContent = tpl(atMax ? dict.stopCopyMax : dict.stopCopy, stopVars);
    };

    presetButtons.forEach((button) => button.addEventListener("click", () => {
      stopStakes.value = button.dataset.p2sPreset;
      presetButtons.forEach((item) => item.classList.toggle("active", item === button));
      updateStopLab();
    }));
    stopStakes.addEventListener("input", () => {
      presetButtons.forEach((item) => item.classList.toggle("active", item.dataset.p2sPreset === stopStakes.value));
      updateStopLab();
    });
    stopClarity.addEventListener("input", updateStopLab);
    updateStopLab();
    window.matchMedia("(max-width: 560px)").addEventListener("change", updateStopLab);
  }

  // Part IV: the payout multiple sets the break-even belief (1/rho). What makes
  // it decisive is geometry against two workload-set boundaries: honest
  // re-execution of a marginal 3-2 tops out near 50% belief, and blind
  // appealing of every 3-2 turns +EV near 2.9x. The multiple must land between.
  const dialRho = document.querySelector("#p4d-rho");
  if (dialRho) {
    const CEILING = .5;       // max belief honest public work can justify on 3-2
    const SPAM_RHO = 2.86;    // blind 3-2 appeals go +EV above this multiple
    const FLOOR_RHO = 2;      // threshold equals the ceiling here
    const dialRhoOut = document.querySelector("#p4d-rho-output");
    const dialSvg = document.querySelector("#p4d-svg");
    const dialAction = document.querySelector("#p4d-action");
    const dialCopy = document.querySelector("#p4d-copy");

    const updateDial = () => {
      const rho = Number(dialRho.value) / 100;
      const threshold = 1 / rho;
      const pct = fmtPct(`${Math.round(threshold * 100)}%`);
      const rhoShort = `${fmtDec(rho.toFixed(2).replace(/0$/, "").replace(/\.0$/, ""))}×`;
      const rhoLabel = tpl(copy.dialRhoLabel, { rho: locale === "tr" ? String(rhoShort).replace("×", "") : rhoShort });
      dialRhoOut.textContent = rhoLabel;
      dialRho.setAttribute("aria-valuetext", rhoLabel);

      // Belief axis: x = 20..700 for 0..100%.
      const CM = isCompactPhone();
      const BX = (b) => 20 + b * 680;
      const BT = 66, BH = 46, BB = BT + BH;
      // Multiple axis: x = 20..700 for 1x..4x.
      const MX = (m) => 20 + (m - 1) / 3 * 680;
      const MT = 226, MH = 34, MB = MT + MH;
      const tX = BX(threshold);
      const headroom = threshold < CEILING;
      dialSvg.innerHTML = `
        <text x="20" y="20" font-size="${CM ? 18 : 13}" font-weight="900" letter-spacing=".06em" fill="#606060">${copy.dialTitle}</text>
        <rect x="${BX(0)}" y="${BT}" width="${BX(CEILING) - BX(0)}" height="${BH}" fill="#0B8A47" opacity=".14"/>
        <rect x="${BX(CEILING)}" y="${BT}" width="${BX(1) - BX(CEILING)}" height="${BH}" fill="#8A8A86" opacity=".14"/>
        ${headroom ? `<rect x="${tX}" y="${BT}" width="${BX(CEILING) - tX}" height="${BH}" fill="#110FFF" opacity=".18"/>` : ""}
        <line x1="${BX(CEILING)}" y1="${BT - 14}" x2="${BX(CEILING)}" y2="${BB}" stroke="#0B8A47" stroke-width="2.5" stroke-dasharray="5 3"/>
        <text x="${CM ? 20 : BX(CEILING) - 8}" y="${BT - 20}" font-size="${CM ? 15 : 12}" font-weight="900" text-anchor="${CM ? "start" : "end"}" fill="#09753C">${copy.dialCeiling}</text>
        ${CM ? "" : `<text x="${BX(.03)}" y="${BB - 18}" font-size="11.5" font-weight="800" fill="#09753C">${copy.dialReachable}</text>`}
        ${CM ? "" : `<text x="${BX(.97)}" y="${BB - 18}" font-size="11.5" font-weight="800" text-anchor="end" fill="#606060">${copy.dialPrivate}</text>`}
        ${!CM && headroom && BX(CEILING) - tX > 96 ? `<text x="${(tX + BX(CEILING)) / 2}" y="${BB - 6}" font-size="10.5" font-weight="900" text-anchor="middle" fill="#070707">${copy.dialCosts}</text>` : ""}
        <line x1="${BX(2 / 3)}" y1="${BT - 4}" x2="${BX(2 / 3)}" y2="${BB + 4}" stroke="#D22F2F" stroke-width="2" stroke-dasharray="2 3"/>
        ${CM ? "" : `<text x="${BX(2 / 3) + 6}" y="${BT - 8}" font-size="11" font-weight="800" fill="#BD2A2A">${copy.dialToday}</text>`}
        <line x1="${tX}" y1="${BT - 10}" x2="${tX}" y2="${BB + 8}" stroke="#070707" stroke-width="3"/>
        <text x="${Math.min(Math.max(tX, 70), 620)}" y="${BB + 24}" font-size="${CM ? 18 : 13}" font-weight="900" text-anchor="middle" fill="#070707">${tpl(copy.dialThreshold, { pct })}</text>
        <text x="20" y="${MT - 12}" font-size="${CM ? 18 : 13}" font-weight="900" letter-spacing=".06em" fill="#606060">${copy.dialAxisTitle}</text>
        <rect x="${MX(1)}" y="${MT}" width="${MX(FLOOR_RHO) - MX(1)}" height="${MH}" fill="#8A8A86" opacity=".16"/>
        <rect x="${MX(FLOOR_RHO)}" y="${MT}" width="${MX(SPAM_RHO) - MX(FLOOR_RHO)}" height="${MH}" fill="#0B8A47" opacity=".14"/>
        <rect x="${MX(SPAM_RHO)}" y="${MT}" width="${MX(4) - MX(SPAM_RHO)}" height="${MH}" fill="#D22F2F" opacity=".14"/>
        ${CM ? "" : `<text x="${(MX(1) + MX(FLOOR_RHO)) / 2}" y="${MT + 21}" font-size="11.5" font-weight="900" text-anchor="middle" fill="#606060">${copy.dialDead}</text>`}
        ${CM ? "" : `<text x="${(MX(FLOOR_RHO) + MX(SPAM_RHO)) / 2}" y="${MT + 21}" font-size="11.5" font-weight="900" text-anchor="middle" fill="#09753C">${copy.dialWindow}</text>`}
        ${CM ? "" : `<text x="${(MX(SPAM_RHO) + MX(4)) / 2}" y="${MT + 21}" font-size="11.5" font-weight="900" text-anchor="middle" fill="#BD2A2A">${copy.dialSpam}</text>`}
        <text x="${MX(FLOOR_RHO)}" y="${MB + 16}" font-size="${CM ? 15 : 11}" font-weight="800" text-anchor="middle" fill="#09753C">${copy.dialFloorTick}</text>
        <text x="${MX(SPAM_RHO)}" y="${CM ? MB + 34 : MB + 16}" font-size="${CM ? 15 : 11}" font-weight="800" text-anchor="middle" fill="#BD2A2A">${copy.dialSpamTick}</text>
        <text x="${MX(1)}" y="${MB + 16}" font-size="${CM ? 15 : 11}" fill="#606060">1×</text>
        <text x="${MX(4) - 4}" y="${MB + 16}" font-size="${CM ? 15 : 11}" text-anchor="end" fill="#606060">4×</text>
        <line x1="${MX(rho)}" y1="${MT - 8}" x2="${MX(rho)}" y2="${MB + 4}" stroke="#070707" stroke-width="3"/>
        <circle cx="${MX(rho)}" cy="${MT - 12}" r="6" fill="#110FFF" stroke="#070707" stroke-width="2.5"/>
        <text x="${Math.min(Math.max(MX(rho) + 12, 46), 640)}" y="${MT - 18}" font-size="${CM ? 18 : 13}" font-weight="900" fill="#070707">${rhoShort}</text>`;

      if (rho < FLOOR_RHO) {
        dialAction.textContent = copy.dialDeadAction;
        dialCopy.textContent = tpl(isCompactPhone() ? compact.dialDeadCopy : copy.dialDeadCopy, { rho: rhoShort, pct });
      } else if (rho <= SPAM_RHO) {
        const room = Math.round((CEILING - threshold) * 100);
        dialAction.textContent = copy.dialWindowAction;
        dialCopy.textContent = tpl(isCompactPhone() ? compact.dialWindowCopy : copy.dialWindowCopy, { rho: rhoShort, pct, room });
      } else {
        dialAction.textContent = copy.dialSpamAction;
        dialCopy.textContent = tpl(isCompactPhone() ? compact.dialSpamCopy : copy.dialSpamCopy, { rho: rhoShort, pct });
      }
    };

    dialRho.addEventListener("input", updateDial);
    updateDial();
    window.matchMedia("(max-width: 560px)").addEventListener("change", updateDial);
  }


  // Plain-words glossary. One source of truth for the hover cards and the
  // glossary list; definitions grounded in the papers, not paraphrased loosely.
  const GLOSSARY = {
    "validator": ["Validator", "A computer taking part in the network's judging. In GenLayer each validator runs an AI model of its own choosing and locks GEN tokens as a security deposit (stake)."],
    "panel": ["Panel", "The small random group of validators chosen to judge one decision. GenLayer's rounds use panels of 5, 7, 11 and so on, growing with each appeal."],
    "population": ["Evaluator population", "The full declared pool of possible judges that a panel is drawn from. The research measures how faithfully a small panel reproduces what this whole pool would decide."],
    "reproducibility": ["Reproducibility", "The chance that a random panel lands on the same side as the whole declared pool of judges would. Deliberately not the same thing as being objectively right."],
    "adversary": ["Adversary", "A participant who votes to push the decision somewhere, not to judge honestly. The research models the worst case: every adversarial vote goes against the honest majority."],
    "equivalence": ["Equivalence Principle", "GenLayer's rule that every contract call declares what counts as “the same answer”, so validators can accept an AI answer that is worded differently from their own."],
    "od": ["Optimistic Democracy", "GenLayer's consensus procedure: a leader proposes an answer, a small panel votes, the result stands unless someone challenges it in time, and each challenge summons a bigger panel."],
    "leader": ["Leader", "The validator picked to actually do the task and propose an answer. The rest of the panel then judges that proposal."],
    "stake": ["Stake", "GEN tokens a validator locks as a security deposit. Voting power comes from locked stake, and provable misconduct can destroy part of it."],
    "delegation": ["Delegation", "Lending your GEN to a validator's stake. Delegators share the rewards without running a node; the minimum is 42 GEN."],
    "slashing": ["Slashing", "The protocol destroying part of a validator's locked stake as punishment for provable misconduct, such as fraud (5% for a leader) or prolonged inactivity (1%)."],
    "bond": ["Appeal bond", "Money a challenger locks to file an appeal. It funds the bigger panel; a failed appeal forfeits it, a successful one returns it with a reward."],
    "appeal": ["Appeal", "A challenge to a provisional decision during its open window. It triggers a new, larger panel to re-judge the question."],
    "expectedloss": ["Expected loss", "The average cost if this exact situation repeated many times: each outcome's probability times what that outcome costs."],
    "modelchecking": ["Model checking", "Having a computer exhaustively explore every reachable state of a system model (here written in the TLA+ language) to check that stated rules can never be broken."],
    "issuance": ["Issuance", "New GEN created by the protocol on a fixed declining schedule to help pay validators: 9% a year at launch, falling toward 4%. The schedule is a ceiling, not a promise."],
  };

  const glTargets = [...document.querySelectorAll("[data-gl], [data-tip]")];
  if (glTargets.length) {
    const card = document.createElement("div");
    card.className = "gl-card";
    card.id = "gl-card";
    card.setAttribute("role", "tooltip");
    card.hidden = true;
    document.body.appendChild(card);
    let hoverTimer = 0;
    let openFor = null;
    let openedAt = 0;
    const closeCard = () => {
      if (!openFor) return;
      card.hidden = true;
      openFor.setAttribute("aria-expanded", "false");
      openFor = null;
    };
    const openCard = (el) => {
      const entry = el.dataset.gl ? GLOSSARY[el.dataset.gl] : null;
      // The glossary lives in this shared file in English; GL_T (the runtime
      // locale map in the page) translates it at open time, falling back to
      // the English text when no translation exists.
      const localized = (value) => (typeof GL_T === "function" ? GL_T(value) : value);
      const text = entry ? localized(entry[1]) : el.dataset.tip;
      if (!text) return;
      card.innerHTML = "";
      if (entry) {
        const heading = document.createElement("strong");
        heading.textContent = localized(entry[0]);
        card.appendChild(heading);
      }
      const body = document.createElement("p");
      body.textContent = text;
      card.appendChild(body);
      card.hidden = false;
      const box = el.getBoundingClientRect();
      card.style.maxWidth = `${Math.min(320, window.innerWidth - 24)}px`;
      let left = box.left + box.width / 2 - card.offsetWidth / 2;
      left = Math.max(12, Math.min(left, window.innerWidth - card.offsetWidth - 12));
      const below = box.bottom + card.offsetHeight + 18 <= window.innerHeight;
      const top = below ? box.bottom + 10 : box.top - card.offsetHeight - 10;
      card.style.left = `${left + window.scrollX}px`;
      card.style.top = `${top + window.scrollY}px`;
      card.classList.toggle("gl-card-above", !below);
      if (openFor && openFor !== el) openFor.setAttribute("aria-expanded", "false");
      openFor = el;
      openedAt = Date.now();
      el.setAttribute("aria-expanded", "true");
    };
    glTargets.forEach((el) => {
      if (el.tagName !== "BUTTON") el.setAttribute("tabindex", "0");
      el.setAttribute("aria-describedby", "gl-card");
      el.setAttribute("aria-expanded", "false");
      el.addEventListener("mouseenter", () => {
        window.clearTimeout(hoverTimer);
        hoverTimer = window.setTimeout(() => openCard(el), 450);
      });
      el.addEventListener("mouseleave", () => {
        window.clearTimeout(hoverTimer);
        window.setTimeout(() => {
          if (openFor === el && !card.matches(":hover")) closeCard();
        }, 200);
      });
      el.addEventListener("focus", () => openCard(el));
      el.addEventListener("blur", () => { if (openFor === el) closeCard(); });
      el.addEventListener("click", (event) => {
        event.preventDefault();
        // On a touch tap the button's focus event has just opened the card;
        // without the grace window this click would immediately toggle it
        // closed again and the tip would never be seen.
        if (openFor === el && Date.now() - openedAt > 400) closeCard(); else openCard(el);
      });
    });
    card.addEventListener("mouseleave", closeCard);
    window.addEventListener("keydown", (event) => { if (event.key === "Escape") closeCard(); });
    window.addEventListener("scroll", closeCard, { passive: true });
    document.addEventListener("pointerdown", (event) => {
      const target = event.target;
      if (openFor && target instanceof Node && !card.contains(target) && !openFor.contains(target)) closeCard();
    }, true);
  }

  // Predict-before-reveal widgets. Answers come from the same models the labs
  // use, so the reveal always matches what the lab below will show.
  document.querySelectorAll("[data-predict]").forEach((box) => {
    const buttons = [...box.querySelectorAll("button[data-guess]")];
    const reveal = box.querySelector(".predict-reveal");
    if (!buttons.length || !reveal) return;
    const correct = box.dataset.answer;
    buttons.forEach((button) => button.addEventListener("click", () => {
      if (box.classList.contains("predict-done")) return;
      box.classList.add("predict-done");
      buttons.forEach((item) => {
        item.disabled = true;
        if (item.dataset.guess === correct) item.classList.add("predict-right");
        else if (item === button) item.classList.add("predict-wrong");
      });
      reveal.hidden = false;
      reveal.classList.toggle("predict-hit", button.dataset.guess === correct);
    }));
  });

  // ---------- V2: reading progress + section scrollspy ----------
  const progressBar = document.querySelector(".site-header .progress");
  if (progressBar) {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  const navLinks = [...document.querySelectorAll(".site-header nav a")];
  const spyTargets = navLinks.map((a) => document.querySelector(a.hash)).filter(Boolean);
  if (spyTargets.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entryList) => {
      entryList.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => a.setAttribute("aria-current", String(a.hash === `#${entry.target.id}`)));
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    spyTargets.forEach((t) => spy.observe(t));
  }

  // ---------- V2: glossary section fills from the same GLOSSARY the cards use,
  // localized at load through GL_T exactly like the popover. ----------
  document.querySelectorAll(".glossary details[data-glentry]").forEach((d) => {
    const entry = GLOSSARY[d.dataset.glentry];
    if (!entry) return;
    const localized = (value) => (typeof GL_T === "function" ? GL_T(value) : value);
    d.querySelector("summary").textContent = localized(entry[0]);
    d.querySelector("p").textContent = localized(entry[1]);
  });
})();
