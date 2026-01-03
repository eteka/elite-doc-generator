import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { documentService } from "@/lib/services/document-service"
import { z } from "zod"

const createDocumentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  templateId: z.string().min(1, "Template is required"),
  content: z.object({
    sections: z.array(z.object({
      id: z.string(),
      title: z.string(),
      content: z.string(),
      type: z.enum(["text", "chart", "diagram", "table"]),
      order: z.number(),
    })),
    metadata: z.object({
      author: z.string().optional(),
      version: z.number().optional(),
    }).optional(),
  }),
  folderId: z.string().optional(),
})

// GET /api/documents - List user's documents
export async function GET(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || undefined
    const templateId = searchParams.get("templateId") || undefined
    const folderId = searchParams.get("folderId")
    const sortBy = searchParams.get("sortBy") as "createdAt" | "updatedAt" | "title" || "updatedAt"
    const sortOrder = searchParams.get("sortOrder") as "asc" | "desc" || "desc"

    const documents = await documentService.getByUser(session.user.id, {
      search,
      templateId,
      folderId: folderId === "null" ? null : folderId || undefined,
      sortBy,
      sortOrder,
    })

    return NextResponse.json(documents)
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    )
  }
}

// POST /api/documents - Create a new document
export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createDocumentSchema.parse(body)

    const document = await documentService.create(session.user.id, validatedData)

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error creating document:", error)
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 }
    )
  }
}
