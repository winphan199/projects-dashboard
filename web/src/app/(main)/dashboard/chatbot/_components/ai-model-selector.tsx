import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AIModelSelector() {
  return (
    <Select>
      <SelectTrigger className="w-[180px] px-2 py-0 text-xs" size="sm">
        <SelectValue placeholder="Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-xs">AI Models</SelectLabel>
          <SelectItem value="gpt-3.5-turbo" className="text-xs">
            GPT-3.5 Turbo
          </SelectItem>
          <SelectItem value="gpt-4" className="text-xs">
            GPT-4
          </SelectItem>
          <SelectItem value="gpt-4-32k" className="text-xs">
            GPT-4 32k
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default AIModelSelector;
