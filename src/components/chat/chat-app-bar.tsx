import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { ChatAppBarType } from "./type";

import ReportBlackSVG from "@/assets/icons/report-black.svg";
import ReportWhiteSVG from "@/assets/icons/report-white.svg";
import { AppBar } from "@/components/common/app-bar";
import { Button } from "@/components/common/button";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { colorTheme } from "@/style/color-theme";

export const ChatAppBar = ({
  name,
  onClickReport,
  onClickTransfer,
  setAppBarHeight,
  postId,
  setErrorModal,
}: ChatAppBarType) => {
  const [lastTransfer, setLastTransfer] = useRecoilState(lastTransferState);
  const navigate = useNavigate();

  useEffect(() => {
    const element = document.getElementById("AppBar");
    if (element) {
      const height = element.offsetHeight;
      setAppBarHeight(height);
    }
  }, [setAppBarHeight]);

  const isColorMode = !lastTransfer.transferState;

  return (
    <AppBar isFixed={true} isColorMode={isColorMode} id="AppBar">
      <AppBar.AppBarNavigate style={{ padding: "4% 21px" }}>
        <AppBar.BackButton
          isColorMode={isColorMode}
          onClick={() => navigate("/chat", { replace: true })}
        />
        <AppBar.HeaderText>{name}</AppBar.HeaderText>
        <AppBar.RightButton
          imgSrc={isColorMode ? ReportWhiteSVG : ReportBlackSVG}
          onClick={() => {
            onClickReport();
          }}
        />
      </AppBar.AppBarNavigate>
      {isColorMode ? (
        <BeforeTransfer
          onClickTransfer={onClickTransfer}
          postId={postId}
          setErrorModal={setErrorModal}
        />
      ) : (
        <AfterTransfer postId={postId} setErrorModal={setErrorModal} />
      )}
    </AppBar>
  );
};

const ColumnBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.61rem;
  background-color: white;
`;

const RowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8.3%;
  padding: 0 1.83rem;
`;

const AfterTransferDiv = styled.div`
  width: 100%;
  font-size: 1.67rem;
  padding: 0.56rem;
  background: ${colorTheme.blue100};
  color: white;
  text-align: center;
  line-height: 2.78rem;
`;

type BeforeTransferProps = {
  onClickTransfer: () => void;
  postId: string;
  setErrorModal: () => void;
};

const AfterTransfer = ({
  postId,
  setErrorModal,
}: {
  postId: string;
  setErrorModal: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <ColumnBox>
      <RowBox>
        <Button
          color="blue"
          style={{
            width: "100%",
            padding: "0.83rem",
            borderRadius: "1.11rem",
            color: colorTheme.blue900,
            fontWeight: "500",
          }}
          onClick={setErrorModal}
        >
          거래내역
        </Button>
        <Button
          color="blue"
          style={{
            width: "100%",
            padding: "0.83rem",
            borderRadius: "1.11rem",
            color: colorTheme.blue900,
            fontWeight: "500",
          }}
          onClick={() => {
            navigate(`/post/${postId}`);
          }}
        >
          게시물 보기
        </Button>
      </RowBox>
      <AfterTransferDiv>송금완료</AfterTransferDiv>
    </ColumnBox>
  );
};

const BeforeTransfer = ({
  onClickTransfer,
  postId,
  setErrorModal,
}: BeforeTransferProps) => {
  const navigate = useNavigate();

  return (
    <ColumnBox
      style={{
        backgroundColor: colorTheme.blue900,
        paddingBottom: "13px",
      }}
    >
      <RowBox>
        <Button
          color="white"
          style={{
            width: "100%",
            padding: "0.84rem",
            borderRadius: "1.11rem",
            color: colorTheme.blue900,
            fontWeight: "500",
          }}
          onClick={setErrorModal}
        >
          거래파기
        </Button>
        <Button
          color="white"
          style={{
            width: "100%",
            padding: "0.84rem",
            borderRadius: "1.11rem",
            color: colorTheme.blue900,
            fontWeight: "500",
          }}
          onClick={() => {
            navigate(`/post/${postId}`);
          }}
        >
          게시물 보기
        </Button>
      </RowBox>
      <div style={{ padding: "0 1.833rem" }}>
        <Button
          color="white"
          style={{
            width: "100%",
            fontSize: "1.33rem",
            padding: "0.56rem",
            borderRadius: "1.11rem",
            marginTop: "0",
            color: colorTheme.blue900,
            fontWeight: "500",
          }}
          onClick={onClickTransfer}
        >
          송금하기
        </Button>
      </div>
    </ColumnBox>
  );
};
