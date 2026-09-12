import { Sheet } from "react-modal-sheet";

import type { QuizListItem } from "../../../models/QuizModel";
import QuizIntro from "./QuizIntro";

interface QuizBottomSheetProps {
  quiz: QuizListItem;
  drawerOpen: boolean;
  drawerClose: () => void;
}

const QuizBottomSheet = ({
  quiz,
  drawerOpen,
  drawerClose,
}: QuizBottomSheetProps) => {
  if (!quiz) return null;

  return (
    <Sheet
      isOpen={drawerOpen}
      onClose={drawerClose}
      snapPoints={[0, 0.8, 1]}
      initialSnap={1}
    >
      <Sheet.Container
        style={{
          borderTopLeftRadius: "32px",
          borderTopRightRadius: "32px",
          backgroundColor: "#FFFFFF",
          height: "auto",
          maxHeight: "90vh",
        }}
      >
        <Sheet.Header />

        <Sheet.Content
          style={{
            overflowY: "auto",
            paddingBottom: "20px",
          }}
        >
          <QuizIntro quiz={quiz} />
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={drawerClose} />
    </Sheet>
  );
};

export default QuizBottomSheet;
