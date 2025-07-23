import ProjectList from './project-list'

export default function ProjectDashboard() {
  return (
    <>
      {/* <Modal id="upgrade-modal" title="Upgrade Required">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-600">
            <Crown className="size-5" />
            <span className="font-semibold">Project Limit Reached</span>
          </div>
          <p className="text-muted-foreground text-sm">
            You've reached the maximum number of projects for your current plan.
            Upgrade to Pro for unlimited projects and advanced features.
          </p>
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => closeModal('upgrade-modal')}
            >
              Cancel
            </Button>
            <Link to="/subscription">
              <Button className="flex items-center gap-1">
                <Crown className="size-4" />
                Upgrade to Pro
              </Button>
            </Link>
          </div>
        </div>
      </Modal> */}

      <div className="flex h-full w-full flex-col">
        <main className="flex-1 p-4">
          <ProjectList />
        </main>
      </div>
    </>
  )
}
