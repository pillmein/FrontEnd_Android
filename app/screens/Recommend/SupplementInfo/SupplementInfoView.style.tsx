import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

export const InfoHeader = styled.View`
  margin-top: 5px;
  margin-bottom: 10px;
  flex-direction: row;
  position: relative;
`;
export const SupplementName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
`;
export const InfoSection = styled.View`
  margin-top: 20px;
  margin-bottom: 2px;
  padding: 8px;
  border-radius: 20px;
`;
export const InfoLabel = styled.Text`
  text-align: center;
  align-self: flex-start;
  padding: 10px;
  background-color: #6a986c;
  color: white;
  border-radius: 20px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;
export const InfoList = styled.Text`
  font-size: 16px;
  padding: 5px;
`;

export const InfoListRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 4px;
`;

export const InfoListText = styled.Text`
  font-size: 15px;
  line-height: 22px;
  flex-shrink: 1;
`;
