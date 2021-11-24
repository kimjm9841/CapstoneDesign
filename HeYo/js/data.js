const qnaList=[
    {
        q: 'Q1. 안녕하세요 반가워요! HeYo에 오신 걸 환영합니다!\n사용자님의 이름은 무엇인가요?',
        a: [        
                {answer: '답변1', type: [1]}
        ]
    },
    {
        q: 'Q2. 직접 운동 계획 짜는 것을 좋아하나요?',
        a: [
                {answer: '응 좋아!', type: [1]},
                {answer: '아니 귀찮아..', type: [2]}
        ]
    },
    {
        q: 'Q3. 요즘 어디 아프신 곳이 있나요?',
        a: [
                {answer: '어깨/목', type: [1]},
                {answer: '손목', type: [2]},
                {answer: '허리', type: [3]},
                {answer: '다리', type: [4]},
                {answer: '발', type: [5]},
                {answer: '없어!', type: [6]}
        ]
    },
    {
        q: 'Q4. 선호하시는 운동 부위가 있나요?',
        a: [
                {answer: '어깨/목', type: [1]},
                {answer: '손목', type: [2]},
                {answer: '허리', type: [3]},
                {answer: '다리', type: [4]},
                {answer: '발', type: [5]},
                {answer: '없어!', type: [6]}
        ]
    },
    {
        q: 'Q5. 주변에 가지고 있는 운동 도구가 있나요?',
        a: [
                {answer: '폼롤러', type: [1]},
                {answer: '마사지볼', type: [2]},
                {answer: '덤벨', type: [3]},
                {answer: '수건', type: [4]},
                {answer: '밴드', type: [5]},
                {answer: '없어!', type: [6]}
        ]
    },
    {
        q: '에 대해서 더 알 수 있나요??',
        a: [
                {answer: '성격(MBTI)', type: [1]},
                {answer: '키(cm)', type: [2]},
                {answer: '몸무게(kg)', type: [3]},
                {answer: '나이', type: [4]},
                {answer: '성별', type: [5]},
        ]
    },
    {
        q: 'Q6. 운동은 언제 하실건가요?',
        a: [
                {answer: '내가 정할게', type: [1]},
                {answer: '알아서 해줘', type: [2]}
        ]
    }
]

const infoList=[
    {
        name: '감쟈',
        desc: '우린 감자였어!'
    },
    {
        name: '고구마',
        desc: '우린 고구마였어!'
    }
]

const bmi_result=[
    {
        bmi: '비만',
        desc: 'bmi는 비만에 해당됩니다. 운동 강도가 높은 영상이 추가로 추천됩니다.'
    }
]

const mbti_result=[
    {
        mbti: 'FP',
        desc: '님의 mbti는 FP형에 해당됩니다. [음악, 반복이 적은, 진입장벽이 낮은] 운동을 위주로 추천됩니다.'
    },
    {
        mbti: 'FJ',
        desc: '님의 mbti는 FJ형에 해당됩니다. [적절한 강도, 기구를 활용한, 분야 제한 없는] 운동을 위주로 추천됩니다.'
    },
    {
        mbti: 'TP',
        desc: '님의 mbti는 TP형에 해당됩니다. [단기적인, 흥미, 진입장벽이 낮은] 운동을 위주로 추천됩니다.'
    },
    {
        mbit: 'TJ',
        desc: '님의 mbti는 TJ형에 해당됩니다. [계획적인, 집중하는] 운동을 위주로 추천됩니다.'
    }
]