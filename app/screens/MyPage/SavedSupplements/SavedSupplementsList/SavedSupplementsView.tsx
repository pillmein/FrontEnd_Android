import {
  ButtonBack,
  ScreenWrapper,
  ButtonSaveSupplement,
  DeleteSavedSupplementModal,
} from "../../../../components";
import { useEffect, useState } from "react";
import * as S from "./SavedSupplements.style";
import { FlatList, TouchableOpacity } from "react-native";
import apiSO from "../../../../api/apiSO";

// 임시 데이터
// const supplementData = [
//   {
//     id: 1,
//     image:
//       "https://mblogthumb-phinf.pstatic.net/MjAxOTEwMThfMjYw/MDAxNTcxMzgxNjI0NDYx.O50IFDXsRFr5xxzQllBdkJyDRYLYVn0B3vcXT3QT89Eg.Ge8tcmWVjRte8AOo1t9f5Lo0zMgIEKpfiVFHXTV0E9kg.PNG.pharmcadia/SE-f4b5e85f-8d97-4baa-a98f-155b006c6415.png?type=w800",
//     name: "비맥스 메타",
//     ingredients: "비타민B1",
//     amount: "95mg",
//     effects: "피로 회복, 신경 건강 지원, 에너지 대사 촉진",
//     precautions: "공복 섭취 피하기, 야연 과다 복용 주의",
//   },
//   {
//     id: 2,
//     image: "",
//     name: "영양제 A",
//     ingredients: "비타민C",
//     amount: "500mg",
//     effects: "면역력 강화, 항산화 작용",
//     precautions: "과다 섭취 시 위장 장애 가능",
//   },
//   {
//     id: 3,
//     image: "",
//     name: "영양제 B",
//     ingredients: "오메가3",
//     amount: "1000mg",
//     effects: "혈액 순환 개선, 두뇌 건강 지원",
//     precautions: "혈액 응고 억제 효과로 수술 전 섭취 주의",
//   },
// ];

const SavedSupplementsView = ({ navigation }: any) => {
  const [supplements, setSupplements] = useState<any[]>([]);
  const [savedStatus, setSavedStatus] = useState<Record<number, boolean>>(
    supplements.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {} as Record<number, boolean>)
  );
  const [selectedSupplement, setSelectedSupplement] = useState<number | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchSavedSupplements();
  }, []);

  const fetchSavedSupplements = async () => {
    try {
      const response = await apiSO.get("/favorites/get_favorites");
      const data = response.data;
      console.log("찜한 영양제 목록 조회 성공:", data);
      setSupplements(data);
      // 찜 여부 초기화 (전부 true)
      const initialStatus = data.reduce(
        (acc: Record<number, boolean>, item: any) => {
          acc[item.apiSupplementId] = true;
          return acc;
        },
        {}
      );
      setSavedStatus(initialStatus);
    } catch (error: any) {
      console.log(
        "찜한 영양제 목록 조회 실패:",
        error.response?.data || error.message
      );
    }
  };

  const toggleSave = (apiSupplementId: number) => {
    if (savedStatus[apiSupplementId]) {
      setSelectedSupplement(apiSupplementId);
      setModalVisible(true);
    } else {
      setSavedStatus((prev) => ({
        ...prev,
        [apiSupplementId]: true,
      }));
    }
  };

  const handleDelete = async () => {
    if (selectedSupplement !== null) {
      try {
        await apiSO.delete(`/favorites/delete_favorite`, {
          data: { apiSupplementId: selectedSupplement },
        });
        console.log("찜한 영양제 삭제 성공:", selectedSupplement);

        setSavedStatus((prev) => ({
          ...prev,
          [selectedSupplement]: false,
        }));
        setSupplements((prev) =>
          prev.filter((item) => item.apiSupplementId !== selectedSupplement)
        );
      } catch (error: any) {
        console.error(
          "찜한 영양제 삭제 실패:",
          error.response?.data || error.message
        );
      }
    }
    setModalVisible(false);
  };

  return (
    <ScreenWrapper>
      <S.Header>
        <ButtonBack />
        <S.Title>찜한 영양제 목록</S.Title>
      </S.Header>
      <S.SupplementsContainer>
        <FlatList
          data={supplements}
          keyExtractor={(item) => item.apiSupplementId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SavedSupplementInfoView", {
                  apiSupplementId: item.apiSupplementId,
                })
              }
            >
              <S.SupplementCard>
                {/* 제품 이미지 */}
                <S.ImageContainer>
                  <S.ProductImage
                    source={{ uri: item.imgUrl }}
                    resizeMode="contain"
                  />
                </S.ImageContainer>

                {/* 제품 정보 */}
                <S.InfoContainer>
                  <S.NameContainer>
                    <S.SupplementName>{item.name}</S.SupplementName>
                    <ButtonSaveSupplement
                      apiSupplementId={item.apiSupplementId}
                      savedStatus={savedStatus}
                      toggleSave={toggleSave}
                    />
                  </S.NameContainer>
                  <S.Row>
                    <S.Badge>
                      {(() => {
                        if (!item.ingredients) return "정보 없음";
                        const ingredientsArray = item.ingredients
                          .split(",")
                          .map((i: string) => i.trim());
                        const shown = ingredientsArray.slice(0, 2).join(", ");
                        return shown;
                      })()}
                    </S.Badge>
                  </S.Row>
                  <S.Description>
                    <S.BoldText>효과:</S.BoldText> {item.effects}
                  </S.Description>
                  <S.Description>
                    <S.BoldText>주의사항:</S.BoldText> {item.warnings}
                  </S.Description>
                </S.InfoContainer>
              </S.SupplementCard>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150 }} // 하단 여백
        />
      </S.SupplementsContainer>
      <DeleteSavedSupplementModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDelete}
      />
    </ScreenWrapper>
  );
};

export default SavedSupplementsView;
