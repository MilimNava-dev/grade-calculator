import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Trash2 } from 'lucide-react';

export default function PopoverDemo({ values, setValues, setCategories, onCategoriesUpdate }) {
  const [open, setOpen] = useState(false)
  const [draftValues, setDraftValues] = useState(values)

  // Cuando se abre el popover, inicializa draftValues con values
  useEffect(() => {
    if (open) {
      setDraftValues(values)
    }
  }, [open, values])

  // Guardar cambios
  const handleSave = () => {
    setValues(draftValues)
    setCategories((prev) =>
      prev.map((subject) =>
        subject.id === "spanish"
          ? { ...subject, tags: [...draftValues] }
          : subject
      )
    )
    if (onCategoriesUpdate) {
      onCategoriesUpdate(draftValues)
    }
    setOpen(false)
  }

  // Añadir categoría
  const handleAddCategory = () => {
    setDraftValues(prev => [
      ...prev,
      { id: Date.now().toString(), name: "", weight: "0" }
    ])
  }

  // Eliminar categoría
  const handleDeleteCategory = (id) => {
    setDraftValues(prev => prev.filter(cat => cat.id !== id))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-1">
          Weight
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Weight</h4>
            <p className="text-muted-foreground text-sm">
              Set the weight for each category
            </p>
          </div>
          <div className="grid gap-2">
            {draftValues.map((cat) => (
              <div className="grid grid-cols-6 items-center gap-2" key={cat.id}>
                <Input
                  value={cat.name}
                  className="col-span-3 h-8"
                  onChange={(e) =>
                    setDraftValues((prev) =>
                      prev.map((item) =>
                        item.id === cat.id
                          ? { ...item, name: e.target.value }
                          : item
                      )
                    )
                  }
                />
                <Input
                  id={cat.id}
                  type="number"
                  value={cat.weight}
                  onChange={(e) =>
                    setDraftValues((prev) =>
                      prev.map((item) =>
                        item.id === cat.id
                          ? { ...item, weight: e.target.value }
                          : item
                      )
                    )
                  }
                  className="col-span-2 h-8"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="col-span-1"
                  onClick={() => handleDeleteCategory(cat.id)}
                  title="Eliminar categoría"
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button variant="outline" className="mt-2" onClick={handleAddCategory}>
              Add new Category
            </Button>
            <Button className="mt-1" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
