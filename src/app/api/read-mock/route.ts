import { existsSync,readFileSync } from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('file')
    
    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 })
    }

    const filePath = join(process.cwd(), 'docs/development/dashboard-design/03-jsx-mock', filename)
    
    if (!existsSync(filePath)) {
      return NextResponse.json({ 
        error: `File not found: ${filename}`,
        path: filePath 
      }, { status: 404 })
    }

    const content = readFileSync(filePath, 'utf8')
    
    return NextResponse.json({ 
      filename,
      content,
      success: true,
      size: content.length
    })
  } catch (error: any) {
    return NextResponse.json({ 
      error: `Failed to read file`,
      details: error.message 
    }, { status: 500 })
  }
}