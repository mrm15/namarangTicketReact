function CashBoxType({row,onChange,onBlur}) {
  return (<>
    <input
      {...row}
      type="search"
      list={row?.id}
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
    />
    <datalist id={row.id}>
      {row?.options?.map((option, index) => {

        return <option key={index} value={option}>{option}</option>
      })}
    </datalist>
  </>);
}

export default CashBoxType;