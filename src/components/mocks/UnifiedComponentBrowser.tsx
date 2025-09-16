/* eslint-disable */
// TEMPORARILY DISABLED - Prototype imports need to be updated after component relocation
// This mock file needs to be updated to use the new prototype paths after the prototypes
// have been moved from src/components/atomic/organisms/ to src/design-system/prototypes/

export default function DisabledUnifiedComponentBrowser() {
  return (
    <div className='flex h-screen items-center justify-center p-8'>
      <div className='text-center'>
        <h2 className='mb-4 text-2xl font-bold text-foreground'>UnifiedComponentBrowser</h2>
        <p className='max-w-md text-muted-foreground'>
          This component browser is temporarily disabled while prototype imports are being updated after the component
          relocation from organisms to design-system/prototypes/.
        </p>
        <p className='mt-4 text-sm text-muted-foreground'>
          The file will be restored once all import paths have been properly updated.
        </p>
      </div>
    </div>
  );
}
