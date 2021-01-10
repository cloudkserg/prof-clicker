export default function deleteNeededMans(mans) {
    return mans.filter(man => man.index !== 0);
}
