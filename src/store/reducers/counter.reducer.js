import { decrement, DECREMENT, INCREMENT, RESET } from "../actions";

const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
            case RESET:
                return state = 0;
                  case 'SET_COUNTER': // Обработка установки счетчика
            return { ...state, counter: action.payload };
        default:
            return state;
    }
};

export default counterReducer;
