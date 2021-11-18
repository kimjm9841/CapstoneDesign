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

//일단 데이터 여기다가 적어놓음! 이거 다른 파일에서 php로 받으면 거기로 옮기면 될듯.(html 다 수정해야함_script에서 module 필수!!)
export const fairyList=["포크", "30", "1"] //순서대로 "이름, 비만도, 의상"