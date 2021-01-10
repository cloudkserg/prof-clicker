export default function changeMans (mans) {
    return mans.map(man => {
        man.index--;
        return man;
    });
};
