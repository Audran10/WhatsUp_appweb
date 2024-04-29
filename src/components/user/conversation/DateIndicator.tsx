import React from "react";
import { formatConversationDate } from "../../../utils/formatDate";

interface DateIndicatorProps {
  dateMessage: Date;
  datePreviousMessage: Date | null;
}

const DateIndicator: React.FC<DateIndicatorProps> = ({
  dateMessage,
  datePreviousMessage,
}) => {
  const date = formatConversationDate(dateMessage);
  const previousDate = datePreviousMessage
    ? formatConversationDate(datePreviousMessage)
    : null;

  return (
    <>
      {date !== previousDate ? (
        <div className="flex justify-center text-sm text-mainGray my-4">
          <p className="w-28 p-2 bg-mainWhite text-center rounded-md">{date}</p>
        </div>
      ) : null}
    </>
  );
};

export default DateIndicator;
