import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ProductDetailsProps {
  description: string;
  seller: string;
  category: string;
}

export function ProductDetails({ description, seller, category }: ProductDetailsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="mt-4">
        <p className="text-sm text-muted-foreground">{description}</p>
      </TabsContent>
      <TabsContent value="details" className="mt-4">
        <ul className="text-sm text-muted-foreground">
          <li><strong>Seller:</strong> {seller}</li>
          <li><strong>Category:</strong> {category}</li>
        </ul>
      </TabsContent>
    </Tabs>
  )
}

