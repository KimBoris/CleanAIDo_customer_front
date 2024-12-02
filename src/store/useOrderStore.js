import { create } from 'zustand';

const useOrderStore = create((set) => {
    // 로컬 스토리지에서 상태 복원
    const storedDTO = localStorage.getItem('purchasedDTO');
    const initialState = storedDTO ? JSON.parse(storedDTO) : null;

    return {
        purchasedDTO: initialState, // 초기 상태 설정

        // DTO 설정 메서드
        setPurchaseDTO: (dto) => {
            console.log('DTO 저장:', dto);
            // 상태를 업데이트하고 로컬 스토리지에 저장
            set({ purchasedDTO: dto });
            localStorage.setItem('purchasedDTO', JSON.stringify(dto));
        }
    };
});

export default useOrderStore;
