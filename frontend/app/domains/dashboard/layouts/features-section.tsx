import { CheckCircle, Code, GitBranch, Layers } from 'lucide-react'

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24" id="features">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need to manage Ansible
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our flow editor makes Ansible automation accessible to everyone,
              from beginners to experts.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex items-center space-x-2">
              <GitBranch className="text-primary h-6 w-6" />
              <h3 className="text-xl font-bold">Visual Flow Editor</h3>
            </div>
            <p className="text-muted-foreground">
              Drag and drop interface to create complex Ansible workflows
              without writing YAML by hand.
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="text-primary h-6 w-6" />
              <h3 className="text-xl font-bold">YAML Conversion</h3>
            </div>
            <p className="text-muted-foreground">
              Automatically convert your visual flows to Ansible YAML and vice
              versa.
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex items-center space-x-2">
              <Layers className="text-primary h-6 w-6" />
              <h3 className="text-xl font-bold">Template Library</h3>
            </div>
            <p className="text-muted-foreground">
              Access a library of pre-built templates for common automation
              tasks.
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-primary h-6 w-6" />
              <h3 className="text-xl font-bold">Validation & Testing</h3>
            </div>
            <p className="text-muted-foreground">
              Validate your Ansible playbooks before deployment and test them in
              a sandbox environment.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="bg-background relative w-full max-w-4xl rounded-lg border p-6 shadow-lg">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col space-y-2">
                <div className="font-medium">Easy to Use</div>
                <div className="text-muted-foreground text-sm">
                  Intuitive interface for both beginners and experts
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="font-medium">Version Control</div>
                <div className="text-muted-foreground text-sm">
                  Track changes and collaborate with your team
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="font-medium">Execution Monitoring</div>
                <div className="text-muted-foreground text-sm">
                  Real-time monitoring of playbook execution
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="font-medium">Role Management</div>
                <div className="text-muted-foreground text-sm">
                  Create and manage Ansible roles visually
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="font-medium">Inventory Integration</div>
                <div className="text-muted-foreground text-sm">
                  Connect to your existing Ansible inventory
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="font-medium">API Access</div>
                <div className="text-muted-foreground text-sm">
                  Integrate with your existing tools and workflows
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
