export default function getDecreasedItemCountInTime (profItemCount, prevDecreasedItemCount) {
    const newDecreasedItemCount = prevDecreasedItemCount + 1;
    if (profItemCount - newDecreasedItemCount < 0) return prevDecreasedItemCount;
    return newDecreasedItemCount;
}
