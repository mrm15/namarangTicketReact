import FilterTextInTable from "../FilterTextInTable";

interface BaseFilterType {
    uniqueId: string;
    property: string;
    operator: "*" | "in" | "=" | "includes" | "nin" | "regex" | '!=' | '<' | '<=' | '>' | '>=';
    placeHolder?: string;
}

const IAdvanceFilter {
    model: "advanceFilter",

}
interface modelDateFilterType {
    model: "singleFilter" | "advanceFilter",
}

// When filterType is 'date', date-related logic is used
interface DateFilterType extends BaseFilterType {
    filterType: "date";
    dateTypeValueShow: "hesabfa" | "JsDate"; // Required for date filters


}

// When filterType is 'select', optionsForSelectOption is required
interface SelectFilterType extends BaseFilterType {
    filterType: "select";
    optionsForSelectOption: { key: string; value: string }[] | []; // Required for select filter
}


// When filterType is 'number', no special options are needed
interface NumberFilterType extends BaseFilterType {
    filterType: "number";
}

// Default catch-all type for other filters (text input, etc.)
interface TextFilterType extends BaseFilterType {
    filterType?: "string";
}

export  type propsOfFilterTextInTable = DateFilterType | SelectFilterType | NumberFilterType | TextFilterType;
