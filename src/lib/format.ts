export type ChangeDirection = "up" | "down" | "flat";

const banglaNumber = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 1,
});

export function formatBnNumber(value: number) {
  return banglaNumber.format(value);
}

export function formatPrice(value: number) {
  return formatBnNumber(value);
}

export function formatPercentage(value: number) {
  return formatBnNumber(Math.abs(value));
}

export function getUnitLabel(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    dozen: "ডজন",
    litre: "লিটার",
    piece: "পিস",
  };

  return units[unit] || unit;
}

export function getChangeVisual(direction: ChangeDirection) {
  if (direction === "up") {
    return {
      arrow: "▲",
      label: "দাম বেড়েছে",
      badgeClass: "bg-green-50 text-green-700",
      textClass: "text-green-700",
    };
  }

  if (direction === "down") {
    return {
      arrow: "▼",
      label: "দাম কমেছে",
      badgeClass: "bg-red-50 text-red-600",
      textClass: "text-red-600",
    };
  }

  return {
    arrow: "—",
    label: "দাম অপরিবর্তিত",
    badgeClass: "bg-gray-100 text-gray-500",
    textClass: "text-gray-500",
  };
}
