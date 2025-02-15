import Logo from "../shared/Logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DifficultySelectProps {
  value?: string;
  onChange: (value: string) => void;
}

const renderLogos = (count: number) =>
  Array.from({ length: count }).map((_, index) => (
    <Logo key={index} className="size-8" />
  ));

export default function DifficultySelect({
  value,
  onChange,
}: DifficultySelectProps) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[250px]">
        <SelectValue
          placeholder={
            value ? `Difficulté: ${value}` : "Sélectionner une difficulté"
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ONE">
          <div className="flex gap-2 items-center">{renderLogos(1)} Facile</div>
        </SelectItem>
        <SelectItem value="TWO">
          <div className="flex gap-2 items-center">{renderLogos(2)} Moyen</div>
        </SelectItem>
        <SelectItem value="THREE">
          <div className="flex gap-2 items-center">
            {renderLogos(3)} Difficile
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
