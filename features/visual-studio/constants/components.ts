export type PropFieldType =
  | "text"
  | "number"
  | "boolean"
  | "select"
  | "color"
  | "slider"
  | "spacing"
  | "typography"
  | "shadow"
  | "border"
  | "icon";

export interface PropFieldDef {
  id: string;
  label: string;
  type: PropFieldType;
  group: string;
  defaultValue: unknown;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface ComponentDef {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  defaultProps: Record<string, unknown>;
  propFields: PropFieldDef[];
  tags: string[];
  isContainer: boolean;
  defaultSize: { width: number; height: number };
}

export const COMPONENT_CATEGORIES = [
  { id: "basic", label: "Basic", icon: "Box" },
  { id: "layout", label: "Layout", icon: "Layout" },
  { id: "forms", label: "Forms", icon: "FormInput" },
  { id: "feedback", label: "Feedback", icon: "AlertCircle" },
  { id: "navigation", label: "Navigation", icon: "Navigation" },
  { id: "data", label: "Data Display", icon: "Table" },
  { id: "overlay", label: "Overlay", icon: "Layers" },
] as const;

const spacingFields = (group: string): PropFieldDef[] => [
  { id: "paddingTop", label: "Padding Top", type: "slider", group, defaultValue: 0, min: 0, max: 96, step: 4, unit: "px" },
  { id: "paddingRight", label: "Padding Right", type: "slider", group, defaultValue: 0, min: 0, max: 96, step: 4, unit: "px" },
  { id: "paddingBottom", label: "Padding Bottom", type: "slider", group, defaultValue: 0, min: 0, max: 96, step: 4, unit: "px" },
  { id: "paddingLeft", label: "Padding Left", type: "slider", group, defaultValue: 0, min: 0, max: 96, step: 4, unit: "px" },
  { id: "marginTop", label: "Margin Top", type: "slider", group, defaultValue: 0, min: 0, max: 96, step: 4, unit: "px" },
  { id: "marginRight", label: "Margin Right", type: "slider", group, defaultValue: 0, min: 0, max: 96, step: 4, unit: "px" },
  { id: "marginBottom", label: "Margin Bottom", type: "slider", group, defaultValue: 0, min: 0, max: 96, step: 4, unit: "px" },
  { id: "marginLeft", label: "Margin Left", type: "slider", group, defaultValue: 0, min: 0, max: 96, step: 4, unit: "px" },
];

const borderFields = (group: string): PropFieldDef[] => [
  { id: "borderWidth", label: "Width", type: "slider", group, defaultValue: 0, min: 0, max: 8, step: 1, unit: "px" },
  { id: "borderColor", label: "Color", type: "color", group, defaultValue: "#e5e7eb" },
  { id: "borderStyle", label: "Style", type: "select", group, defaultValue: "solid", options: [
    { value: "solid", label: "Solid" }, { value: "dashed", label: "Dashed" },
    { value: "dotted", label: "Dotted" }, { value: "none", label: "None" },
  ]},
  { id: "borderRadius", label: "Radius", type: "slider", group, defaultValue: 0, min: 0, max: 999, step: 4, unit: "px" },
];

export const COMPONENT_DEFINITIONS: ComponentDef[] = [
  {
    id: "button",
    name: "Button",
    category: "basic",
    icon: "MousePointerClick",
    description: "Interactive button element",
    tags: ["click", "action", "submit"],
    isContainer: false,
    defaultSize: { width: 120, height: 44 },
    defaultProps: {
      text: "Button",
      variant: "primary",
      size: "md",
      disabled: false,
      loading: false,
      backgroundColor: "",
      textColor: "",
      borderRadius: 999,
    },
    propFields: [
      { id: "text", label: "Text", type: "text", group: "content", defaultValue: "Button" },
      { id: "variant", label: "Variant", type: "select", group: "content", defaultValue: "primary", options: [
        { value: "primary", label: "Primary" }, { value: "secondary", label: "Secondary" },
        { value: "outline", label: "Outline" }, { value: "ghost", label: "Ghost" },
        { value: "destructive", label: "Destructive" },
      ]},
      { id: "size", label: "Size", type: "select", group: "content", defaultValue: "md", options: [
        { value: "sm", label: "Small" }, { value: "md", label: "Medium" },
        { value: "lg", label: "Large" }, { value: "icon", label: "Icon" },
      ]},
      { id: "disabled", label: "Disabled", type: "boolean", group: "state", defaultValue: false },
      { id: "loading", label: "Loading", type: "boolean", group: "state", defaultValue: false },
      { id: "backgroundColor", label: "Background", type: "color", group: "style", defaultValue: "" },
      { id: "textColor", label: "Text Color", type: "color", group: "style", defaultValue: "" },
      { id: "borderRadius", label: "Radius", type: "slider", group: "style", defaultValue: 999, min: 0, max: 999, step: 4, unit: "px" },
      { id: "fontSize", label: "Font Size", type: "slider", group: "typography", defaultValue: 14, min: 10, max: 32, step: 1, unit: "px" },
      { id: "fontWeight", label: "Font Weight", type: "select", group: "typography", defaultValue: "500", options: [
        { value: "400", label: "Regular" }, { value: "500", label: "Medium" },
        { value: "600", label: "Semibold" }, { value: "700", label: "Bold" },
      ]},
      ...spacingFields("spacing"),
      { id: "shadow", label: "Shadow", type: "shadow", group: "effects", defaultValue: "none" },
    ],
  },
  {
    id: "card",
    name: "Card",
    category: "layout",
    icon: "Square",
    description: "Container card with optional header/footer",
    tags: ["container", "panel", "surface"],
    isContainer: true,
    defaultSize: { width: 320, height: 200 },
    defaultProps: {
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#e5e7eb",
      borderStyle: "solid",
      borderRadius: 12,
      shadow: "sm",
    },
    propFields: [
      { id: "backgroundColor", label: "Background", type: "color", group: "style", defaultValue: "#ffffff" },
      ...borderFields("border"),
      { id: "shadow", label: "Shadow", type: "shadow", group: "effects", defaultValue: "sm" },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "input",
    name: "Input",
    category: "forms",
    icon: "TextCursorInput",
    description: "Text input field",
    tags: ["form", "text", "field"],
    isContainer: false,
    defaultSize: { width: 240, height: 44 },
    defaultProps: {
      placeholder: "Enter text...",
      label: "",
      disabled: false,
      error: false,
      errorMessage: "",
      inputType: "text",
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 8,
    },
    propFields: [
      { id: "placeholder", label: "Placeholder", type: "text", group: "content", defaultValue: "Enter text..." },
      { id: "label", label: "Label", type: "text", group: "content", defaultValue: "" },
      { id: "inputType", label: "Type", type: "select", group: "content", defaultValue: "text", options: [
        { value: "text", label: "Text" }, { value: "email", label: "Email" },
        { value: "password", label: "Password" }, { value: "number", label: "Number" },
        { value: "tel", label: "Phone" }, { value: "url", label: "URL" },
      ]},
      { id: "disabled", label: "Disabled", type: "boolean", group: "state", defaultValue: false },
      { id: "error", label: "Error", type: "boolean", group: "state", defaultValue: false },
      { id: "errorMessage", label: "Error Message", type: "text", group: "state", defaultValue: "" },
      ...borderFields("border"),
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "badge",
    name: "Badge",
    category: "basic",
    icon: "Tag",
    description: "Status badge or label",
    tags: ["status", "label", "tag"],
    isContainer: false,
    defaultSize: { width: 80, height: 28 },
    defaultProps: {
      text: "Badge",
      variant: "primary",
      backgroundColor: "",
      textColor: "",
      borderRadius: 999,
    },
    propFields: [
      { id: "text", label: "Text", type: "text", group: "content", defaultValue: "Badge" },
      { id: "variant", label: "Variant", type: "select", group: "content", defaultValue: "primary", options: [
        { value: "primary", label: "Primary" }, { value: "secondary", label: "Secondary" },
        { value: "success", label: "Success" }, { value: "warning", label: "Warning" },
        { value: "danger", label: "Danger" }, { value: "outline", label: "Outline" },
      ]},
      { id: "backgroundColor", label: "Background", type: "color", group: "style", defaultValue: "" },
      { id: "textColor", label: "Text Color", type: "color", group: "style", defaultValue: "" },
      { id: "borderRadius", label: "Radius", type: "slider", group: "style", defaultValue: 999, min: 0, max: 999, step: 4, unit: "px" },
      { id: "fontSize", label: "Font Size", type: "slider", group: "typography", defaultValue: 12, min: 10, max: 24, step: 1, unit: "px" },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "text",
    name: "Text",
    category: "basic",
    icon: "Type",
    description: "Text content block",
    tags: ["text", "paragraph", "heading"],
    isContainer: false,
    defaultSize: { width: 240, height: 32 },
    defaultProps: {
      text: "Text content",
      fontSize: 16,
      fontWeight: "400",
      color: "#1f2937",
      textAlign: "left",
      lineHeight: 1.5,
    },
    propFields: [
      { id: "text", label: "Text", type: "text", group: "content", defaultValue: "Text content" },
      { id: "fontSize", label: "Font Size", type: "slider", group: "typography", defaultValue: 16, min: 10, max: 72, step: 1, unit: "px" },
      { id: "fontWeight", label: "Weight", type: "select", group: "typography", defaultValue: "400", options: [
        { value: "300", label: "Light" }, { value: "400", label: "Regular" },
        { value: "500", label: "Medium" }, { value: "600", label: "Semibold" },
        { value: "700", label: "Bold" }, { value: "800", label: "Extra Bold" },
      ]},
      { id: "color", label: "Color", type: "color", group: "style", defaultValue: "#1f2937" },
      { id: "textAlign", label: "Alignment", type: "select", group: "typography", defaultValue: "left", options: [
        { value: "left", label: "Left" }, { value: "center", label: "Center" },
        { value: "right", label: "Right" },
      ]},
      { id: "lineHeight", label: "Line Height", type: "slider", group: "typography", defaultValue: 1.5, min: 1, max: 3, step: 0.1 },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "alert",
    name: "Alert",
    category: "feedback",
    icon: "AlertCircle",
    description: "Alert message banner",
    tags: ["alert", "notification", "message"],
    isContainer: false,
    defaultSize: { width: 360, height: 64 },
    defaultProps: {
      title: "Alert Title",
      description: "This is an alert message.",
      variant: "info",
      closable: false,
      borderRadius: 8,
    },
    propFields: [
      { id: "title", label: "Title", type: "text", group: "content", defaultValue: "Alert Title" },
      { id: "description", label: "Description", type: "text", group: "content", defaultValue: "This is an alert message." },
      { id: "variant", label: "Variant", type: "select", group: "content", defaultValue: "info", options: [
        { value: "info", label: "Info" }, { value: "success", label: "Success" },
        { value: "warning", label: "Warning" }, { value: "danger", label: "Danger" },
      ]},
      { id: "closable", label: "Closable", type: "boolean", group: "state", defaultValue: false },
      { id: "borderRadius", label: "Radius", type: "slider", group: "style", defaultValue: 8, min: 0, max: 999, step: 4, unit: "px" },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "avatar",
    name: "Avatar",
    category: "basic",
    icon: "User",
    description: "User avatar image or initials",
    tags: ["user", "profile", "image"],
    isContainer: false,
    defaultSize: { width: 48, height: 48 },
    defaultProps: {
      initials: "JD",
      size: "md",
      borderRadius: 999,
      backgroundColor: "#6366f1",
      textColor: "#ffffff",
      src: "",
    },
    propFields: [
      { id: "initials", label: "Initials", type: "text", group: "content", defaultValue: "JD" },
      { id: "src", label: "Image URL", type: "text", group: "content", defaultValue: "", placeholder: "https://..." },
      { id: "size", label: "Size", type: "select", group: "content", defaultValue: "md", options: [
        { value: "sm", label: "Small (32)" }, { value: "md", label: "Medium (48)" },
        { value: "lg", label: "Large (64)" }, { value: "xl", label: "XL (96)" },
      ]},
      { id: "borderRadius", label: "Radius", type: "slider", group: "style", defaultValue: 999, min: 0, max: 999, step: 4, unit: "px" },
      { id: "backgroundColor", label: "Background", type: "color", group: "style", defaultValue: "#6366f1" },
      { id: "textColor", label: "Text Color", type: "color", group: "style", defaultValue: "#ffffff" },
    ],
  },
  {
    id: "heading",
    name: "Heading",
    category: "basic",
    icon: "Heading",
    description: "Section heading",
    tags: ["heading", "title", "h1", "h2", "h3"],
    isContainer: false,
    defaultSize: { width: 300, height: 40 },
    defaultProps: {
      text: "Heading",
      level: "h2",
      fontSize: 30,
      fontWeight: "700",
      color: "#111827",
    },
    propFields: [
      { id: "text", label: "Text", type: "text", group: "content", defaultValue: "Heading" },
      { id: "level", label: "Level", type: "select", group: "content", defaultValue: "h2", options: [
        { value: "h1", label: "H1" }, { value: "h2", label: "H2" },
        { value: "h3", label: "H3" }, { value: "h4", label: "H4" },
        { value: "h5", label: "H5" }, { value: "h6", label: "H6" },
      ]},
      { id: "fontSize", label: "Font Size", type: "slider", group: "typography", defaultValue: 30, min: 14, max: 72, step: 1, unit: "px" },
      { id: "fontWeight", label: "Weight", type: "select", group: "typography", defaultValue: "700", options: [
        { value: "600", label: "Semibold" }, { value: "700", label: "Bold" },
        { value: "800", label: "Extra Bold" }, { value: "900", label: "Black" },
      ]},
      { id: "color", label: "Color", type: "color", group: "style", defaultValue: "#111827" },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "container",
    name: "Container",
    category: "layout",
    icon: "LayoutDashboard",
    description: "Flexible layout container",
    tags: ["layout", "flex", "grid", "wrapper"],
    isContainer: true,
    defaultSize: { width: 400, height: 300 },
    defaultProps: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      alignItems: "stretch",
      justifyContent: "flex-start",
      backgroundColor: "",
      borderWidth: 0,
      borderColor: "#e5e7eb",
      borderStyle: "solid",
      borderRadius: 0,
    },
    propFields: [
      { id: "display", label: "Display", type: "select", group: "layout", defaultValue: "flex", options: [
        { value: "flex", label: "Flex" }, { value: "grid", label: "Grid" },
        { value: "block", label: "Block" },
      ]},
      { id: "flexDirection", label: "Direction", type: "select", group: "layout", defaultValue: "flex-direction", options: [
        { value: "row", label: "Row" }, { value: "col", label: "Column" },
        { value: "row-reverse", label: "Row Reverse" }, { value: "col-reverse", label: "Column Reverse" },
      ]},
      { id: "gap", label: "Gap", type: "slider", group: "layout", defaultValue: 16, min: 0, max: 96, step: 4, unit: "px" },
      { id: "alignItems", label: "Align", type: "select", group: "layout", defaultValue: "stretch", options: [
        { value: "start", label: "Start" }, { value: "center", label: "Center" },
        { value: "end", label: "End" }, { value: "stretch", label: "Stretch" },
      ]},
      { id: "justifyContent", label: "Justify", type: "select", group: "layout", defaultValue: "flex-start", options: [
        { value: "flex-start", label: "Start" }, { value: "center", label: "Center" },
        { value: "flex-end", label: "End" }, { value: "space-between", label: "Between" },
      ]},
      { id: "backgroundColor", label: "Background", type: "color", group: "style", defaultValue: "" },
      ...borderFields("border"),
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "forms",
    icon: "CheckSquare",
    description: "Checkbox toggle input",
    tags: ["form", "checkbox", "toggle"],
    isContainer: false,
    defaultSize: { width: 160, height: 28 },
    defaultProps: {
      label: "Checkbox option",
      checked: false,
      disabled: false,
    },
    propFields: [
      { id: "label", label: "Label", type: "text", group: "content", defaultValue: "Checkbox option" },
      { id: "checked", label: "Checked", type: "boolean", group: "state", defaultValue: false },
      { id: "disabled", label: "Disabled", type: "boolean", group: "state", defaultValue: false },
      { id: "fontSize", label: "Font Size", type: "slider", group: "typography", defaultValue: 14, min: 10, max: 24, step: 1, unit: "px" },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "toggle",
    name: "Toggle",
    category: "forms",
    icon: "ToggleLeft",
    description: "On/off toggle switch",
    tags: ["form", "toggle", "switch"],
    isContainer: false,
    defaultSize: { width: 160, height: 28 },
    defaultProps: {
      label: "Toggle option",
      checked: false,
      disabled: false,
    },
    propFields: [
      { id: "label", label: "Label", type: "text", group: "content", defaultValue: "Toggle option" },
      { id: "checked", label: "Checked", type: "boolean", group: "state", defaultValue: false },
      { id: "disabled", label: "Disabled", type: "boolean", group: "state", defaultValue: false },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "divider",
    name: "Divider",
    category: "layout",
    icon: "Minus",
    description: "Horizontal or vertical divider line",
    tags: ["separator", "line", "divider"],
    isContainer: false,
    defaultSize: { width: 300, height: 2 },
    defaultProps: {
      orientation: "horizontal",
      color: "#e5e7eb",
      thickness: 1,
    },
    propFields: [
      { id: "orientation", label: "Orientation", type: "select", group: "content", defaultValue: "horizontal", options: [
        { value: "horizontal", label: "Horizontal" }, { value: "vertical", label: "Vertical" },
      ]},
      { id: "color", label: "Color", type: "color", group: "style", defaultValue: "#e5e7eb" },
      { id: "thickness", label: "Thickness", type: "slider", group: "style", defaultValue: 1, min: 1, max: 8, step: 1, unit: "px" },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "image",
    name: "Image",
    category: "basic",
    icon: "Image",
    description: "Image element",
    tags: ["image", "photo", "picture"],
    isContainer: false,
    defaultSize: { width: 200, height: 150 },
    defaultProps: {
      src: "",
      alt: "Image",
      objectFit: "cover",
      borderRadius: 0,
    },
    propFields: [
      { id: "src", label: "Source URL", type: "text", group: "content", defaultValue: "", placeholder: "https://..." },
      { id: "alt", label: "Alt Text", type: "text", group: "content", defaultValue: "Image" },
      { id: "objectFit", label: "Fit", type: "select", group: "style", defaultValue: "cover", options: [
        { value: "cover", label: "Cover" }, { value: "contain", label: "Contain" },
        { value: "fill", label: "Fill" }, { value: "none", label: "None" },
      ]},
      { id: "borderRadius", label: "Radius", type: "slider", group: "style", defaultValue: 0, min: 0, max: 999, step: 4, unit: "px" },
      ...borderFields("border"),
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "textarea",
    name: "Textarea",
    category: "forms",
    icon: "AlignLeft",
    description: "Multi-line text input",
    tags: ["form", "textarea", "multiline"],
    isContainer: false,
    defaultSize: { width: 240, height: 100 },
    defaultProps: {
      placeholder: "Enter text...",
      label: "",
      rows: 4,
      disabled: false,
      error: false,
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 8,
    },
    propFields: [
      { id: "placeholder", label: "Placeholder", type: "text", group: "content", defaultValue: "Enter text..." },
      { id: "label", label: "Label", type: "text", group: "content", defaultValue: "" },
      { id: "rows", label: "Rows", type: "slider", group: "content", defaultValue: 4, min: 2, max: 20, step: 1 },
      { id: "disabled", label: "Disabled", type: "boolean", group: "state", defaultValue: false },
      { id: "error", label: "Error", type: "boolean", group: "state", defaultValue: false },
      ...borderFields("border"),
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: "feedback",
    icon: "Info",
    description: "Informational tooltip",
    tags: ["tooltip", "hint", "info"],
    isContainer: false,
    defaultSize: { width: 140, height: 36 },
    defaultProps: {
      text: "Tooltip text",
      content: "Helpful information",
      position: "top",
      variant: "info",
    },
    propFields: [
      { id: "text", label: "Trigger Text", type: "text", group: "content", defaultValue: "Tooltip text" },
      { id: "content", label: "Tooltip Content", type: "text", group: "content", defaultValue: "Helpful information" },
      { id: "position", label: "Position", type: "select", group: "content", defaultValue: "top", options: [
        { value: "top", label: "Top" }, { value: "bottom", label: "Bottom" },
        { value: "left", label: "Left" }, { value: "right", label: "Right" },
      ]},
      { id: "variant", label: "Variant", type: "select", group: "content", defaultValue: "info", options: [
        { value: "info", label: "Info" }, { value: "dark", label: "Dark" },
        { value: "light", label: "Light" },
      ]},
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "progress",
    name: "Progress",
    category: "feedback",
    icon: "Loader",
    description: "Progress bar indicator",
    tags: ["progress", "loading", "bar"],
    isContainer: false,
    defaultSize: { width: 240, height: 12 },
    defaultProps: {
      value: 60,
      max: 100,
      color: "#6366f1",
      trackColor: "#e5e7eb",
      height: 8,
      borderRadius: 999,
    },
    propFields: [
      { id: "value", label: "Value", type: "slider", group: "content", defaultValue: 60, min: 0, max: 100, step: 1, unit: "%" },
      { id: "max", label: "Max", type: "slider", group: "content", defaultValue: 100, min: 1, max: 100, step: 1 },
      { id: "color", label: "Fill Color", type: "color", group: "style", defaultValue: "#6366f1" },
      { id: "trackColor", label: "Track Color", type: "color", group: "style", defaultValue: "#e5e7eb" },
      { id: "height", label: "Height", type: "slider", group: "style", defaultValue: 8, min: 4, max: 32, step: 1, unit: "px" },
      { id: "borderRadius", label: "Radius", type: "slider", group: "style", defaultValue: 999, min: 0, max: 999, step: 4, unit: "px" },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "skeleton",
    name: "Skeleton",
    category: "feedback",
    icon: "RectangleHorizontal",
    description: "Loading skeleton placeholder",
    tags: ["loading", "skeleton", "placeholder"],
    isContainer: false,
    defaultSize: { width: 200, height: 20 },
    defaultProps: {
      variant: "text",
      width: "100%",
      height: 20,
      borderRadius: 4,
    },
    propFields: [
      { id: "variant", label: "Variant", type: "select", group: "content", defaultValue: "text", options: [
        { value: "text", label: "Text" }, { value: "circular", label: "Circular" },
        { value: "rectangular", label: "Rectangular" },
      ]},
      { id: "height", label: "Height", type: "slider", group: "style", defaultValue: 20, min: 8, max: 120, step: 4, unit: "px" },
      { id: "borderRadius", label: "Radius", type: "slider", group: "style", defaultValue: 4, min: 0, max: 999, step: 4, unit: "px" },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "spinner",
    name: "Spinner",
    category: "feedback",
    icon: "Loader2",
    description: "Loading spinner animation",
    tags: ["loading", "spinner", "animation"],
    isContainer: false,
    defaultSize: { width: 40, height: 40 },
    defaultProps: {
      size: 40,
      color: "#6366f1",
      strokeWidth: 3,
    },
    propFields: [
      { id: "size", label: "Size", type: "slider", group: "style", defaultValue: 40, min: 16, max: 96, step: 4, unit: "px" },
      { id: "color", label: "Color", type: "color", group: "style", defaultValue: "#6366f1" },
      { id: "strokeWidth", label: "Stroke Width", type: "slider", group: "style", defaultValue: 3, min: 1, max: 8, step: 1, unit: "px" },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "link",
    name: "Link",
    category: "navigation",
    icon: "ExternalLink",
    description: "Hyperlink element",
    tags: ["link", "anchor", "navigation"],
    isContainer: false,
    defaultSize: { width: 120, height: 28 },
    defaultProps: {
      text: "Link text",
      href: "#",
      target: "_self",
      color: "#6366f1",
      textDecoration: "underline",
      fontSize: 14,
    },
    propFields: [
      { id: "text", label: "Text", type: "text", group: "content", defaultValue: "Link text" },
      { id: "href", label: "URL", type: "text", group: "content", defaultValue: "#" },
      { id: "target", label: "Target", type: "select", group: "content", defaultValue: "_self", options: [
        { value: "_self", label: "Same Tab" }, { value: "_blank", label: "New Tab" },
      ]},
      { id: "color", label: "Color", type: "color", group: "style", defaultValue: "#6366f1" },
      { id: "textDecoration", label: "Decoration", type: "select", group: "style", defaultValue: "underline", options: [
        { value: "none", label: "None" }, { value: "underline", label: "Underline" },
      ]},
      { id: "fontSize", label: "Font Size", type: "slider", group: "typography", defaultValue: 14, min: 10, max: 32, step: 1, unit: "px" },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "table",
    name: "Table",
    category: "data",
    icon: "Table",
    description: "Data table component",
    tags: ["table", "data", "grid"],
    isContainer: false,
    defaultSize: { width: 400, height: 200 },
    defaultProps: {
      columns: "Name,Email,Status",
      rows: 3,
      striped: true,
      bordered: true,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      borderRadius: 8,
    },
    propFields: [
      { id: "columns", label: "Columns", type: "text", group: "content", defaultValue: "Name,Email,Status", placeholder: "Comma-separated" },
      { id: "rows", label: "Rows", type: "slider", group: "content", defaultValue: 3, min: 1, max: 20, step: 1 },
      { id: "striped", label: "Striped", type: "boolean", group: "style", defaultValue: true },
      { id: "bordered", label: "Bordered", type: "boolean", group: "style", defaultValue: true },
      ...borderFields("border"),
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "list",
    name: "List",
    category: "data",
    icon: "List",
    description: "Ordered or unordered list",
    tags: ["list", "items", "unordered"],
    isContainer: false,
    defaultSize: { width: 240, height: 120 },
    defaultProps: {
      items: "Item 1,Item 2,Item 3",
      ordered: false,
      fontSize: 14,
      color: "#374151",
      gap: 8,
    },
    propFields: [
      { id: "items", label: "Items", type: "text", group: "content", defaultValue: "Item 1,Item 2,Item 3", placeholder: "Comma-separated" },
      { id: "ordered", label: "Ordered", type: "boolean", group: "content", defaultValue: false },
      { id: "fontSize", label: "Font Size", type: "slider", group: "typography", defaultValue: 14, min: 10, max: 32, step: 1, unit: "px" },
      { id: "color", label: "Color", type: "color", group: "style", defaultValue: "#374151" },
      { id: "gap", label: "Gap", type: "slider", group: "layout", defaultValue: 8, min: 0, max: 32, step: 4, unit: "px" },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "navbar",
    name: "Navbar",
    category: "navigation",
    icon: "Menu",
    description: "Navigation bar header",
    tags: ["navigation", "header", "nav"],
    isContainer: true,
    defaultSize: { width: 480, height: 64 },
    defaultProps: {
      brand: "Brand",
      items: "Home,About,Services,Contact",
      backgroundColor: "#ffffff",
      borderWidth: 0,
      borderColor: "#e5e7eb",
      borderStyle: "solid",
      shadow: "sm",
    },
    propFields: [
      { id: "brand", label: "Brand", type: "text", group: "content", defaultValue: "Brand" },
      { id: "items", label: "Nav Items", type: "text", group: "content", defaultValue: "Home,About,Services,Contact", placeholder: "Comma-separated" },
      { id: "backgroundColor", label: "Background", type: "color", group: "style", defaultValue: "#ffffff" },
      ...borderFields("border"),
      { id: "shadow", label: "Shadow", type: "shadow", group: "effects", defaultValue: "sm" },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "pagination",
    name: "Pagination",
    category: "navigation",
    icon: "MoreHorizontal",
    description: "Page navigation controls",
    tags: ["pagination", "pages", "navigation"],
    isContainer: false,
    defaultSize: { width: 320, height: 40 },
    defaultProps: {
      currentPage: 1,
      totalPages: 5,
      variant: "default",
      borderRadius: 8,
    },
    propFields: [
      { id: "currentPage", label: "Current Page", type: "slider", group: "content", defaultValue: 1, min: 1, max: 20, step: 1 },
      { id: "totalPages", label: "Total Pages", type: "slider", group: "content", defaultValue: 5, min: 1, max: 20, step: 1 },
      { id: "variant", label: "Variant", type: "select", group: "content", defaultValue: "default", options: [
        { value: "default", label: "Default" }, { value: "outline", label: "Outline" },
        { value: "dots", label: "Dots" },
      ]},
      { id: "borderRadius", label: "Radius", type: "slider", group: "style", defaultValue: 8, min: 0, max: 999, step: 4, unit: "px" },
      ...spacingFields("spacing"),
    ],
  },
  {
    id: "select",
    name: "Select",
    category: "forms",
    icon: "ChevronDown",
    description: "Dropdown select input",
    tags: ["form", "select", "dropdown"],
    isContainer: false,
    defaultSize: { width: 240, height: 44 },
    defaultProps: {
      label: "",
      placeholder: "Select an option...",
      options: "Option 1,Option 2,Option 3",
      disabled: false,
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 8,
    },
    propFields: [
      { id: "label", label: "Label", type: "text", group: "content", defaultValue: "" },
      { id: "placeholder", label: "Placeholder", type: "text", group: "content", defaultValue: "Select an option..." },
      { id: "options", label: "Options", type: "text", group: "content", defaultValue: "Option 1,Option 2,Option 3", placeholder: "Comma-separated" },
      { id: "disabled", label: "Disabled", type: "boolean", group: "state", defaultValue: false },
      ...borderFields("border"),
      ...spacingFields("spacing"),
    ],
  },
];

export function getComponentDef(name: string): ComponentDef | undefined {
  return COMPONENT_DEFINITIONS.find((c) => c.id === name || c.name === name);
}

export function getComponentsByCategory(category: string): ComponentDef[] {
  return COMPONENT_DEFINITIONS.filter((c) => c.category === category);
}

export function searchComponents(query: string): ComponentDef[] {
  const lower = query.toLowerCase();
  return COMPONENT_DEFINITIONS.filter(
    (c) =>
      c.name.toLowerCase().includes(lower) ||
      c.description.toLowerCase().includes(lower) ||
      c.tags.some((t) => t.includes(lower))
  );
}
