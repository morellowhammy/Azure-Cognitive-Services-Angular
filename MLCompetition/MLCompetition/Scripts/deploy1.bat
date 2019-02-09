docker build -f "..\Dockerfile" -t mlcompetition2:dev --target base ".."
#docker run -dt -v "C:\Users\vescudero.SPRINGFIELD\onecoremsvsmon\15.0.28010.2016:C:\remote_debugger:ro" -v "C:\dev\techdays\AzureCognitiveServicesAngular\MLCompetition\MLCompetition:C:\app" -v "C:\Users\vescudero.SPRINGFIELD\AppData\Roaming\ASP.NET\Https:C:\Users\ContainerUser\AppData\Roaming\ASP.NET\Https:ro" -v "C:\Users\vescudero.SPRINGFIELD\AppData\Roaming\Microsoft\UserSecrets:C:\Users\ContainerUser\AppData\Roaming\Microsoft\UserSecrets:ro" -v "C:\Users\vescudero.SPRINGFIELD\.nuget\packages\:c:\.nuget\fallbackpackages2" -v "C:\Program Files\dotnet\sdk\NuGetFallbackFolder:c:\.nuget\fallbackpackages" -e "DOTNET_USE_POLLING_FILE_WATCHER=1" -e "ASPNETCORE_ENVIRONMENT=Development" -e "ASPNETCORE_URLS=https://+:443;http://+:80" -e "NUGET_PACKAGES=c:\.nuget\fallbackpackages2" -e "NUGET_FALLBACK_PACKAGES=c:\.nuget\fallbackpackages;c:\.nuget\fallbackpackages2" -p 54199:80 -p 44317:443 --entrypoint C:\remote_debugger\x64\msvsmon.exe mlcompetition:dev /noauth /anyuser /silent /nostatus /noclrwarn /nosecuritywarn /nofirewallwarn /nowowwarn /fallbackloadremotemanagedpdbs /timeout:2147483646
#docker run -dt -e "DOTNET_USE_POLLING_FILE_WATCHER=1" -e "ASPNETCORE_ENVIRONMENT=Development" -e "ASPNETCORE_URLS=https://+:443;http://+:80" -e "NUGET_PACKAGES=c:\.nuget\fallbackpackages2" -e "NUGET_FALLBACK_PACKAGES=c:\.nuget\fallbackpackages;c:\.nuget\fallbackpackages2" -p 54199:80 -p 44317:443 mlcompetition:dev /noauth /anyuser /silent /nostatus /noclrwarn /nosecuritywarn /nofirewallwarn /nowowwarn /fallbackloadremotemanagedpdbs /timeout:2147483646
#docker run -dt -p 54199:80 -p 44317:443 mlcompetition:dev
docker run -p 54199:80 -p 44317:443 mlcompetition2:dev

#Create a Docker Container Registry in Azure

#Step 1: Tag docker image
 docker tag mlcompetition:dev mlcompetition.azurecr.io/mlcompetition:v1

#Step 2: Login to Azure Container Registry
docker login https://mlcompetition.azurecr.io -u mlcompetition -p jEtm3czBZWXTax4x7K/ZK3gYuH1UuQa4

#Step 3: Push our image in Azure Container Registry
docker push mlcompetition.azurecr.io/mlcompetition:v1

#Step 4: Create a WebApp --> Create an app service plan