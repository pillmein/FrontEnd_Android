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
  background-color: #a5d6a730;
  border-radius: 10px;
`;
export const InfoLabel = styled.Text`
  text-align: left;
  padding: 8px;
  background-color: #6a986c;
  color: white;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;
export const InfoList = styled.Text`
  font-size: 16px;
  padding: 5px;
`;
